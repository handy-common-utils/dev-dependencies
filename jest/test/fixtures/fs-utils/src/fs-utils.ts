/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable unicorn/text-encoding-identifier-case */
/**
 * ## Re-exports
 *
 * ### Functions
 *
 * - [escapeRegExpReplacement = FsUtils.escapeRegExpReplacement](../classes/fs_utils.FsUtils.md#escapeRegExpReplacement)
 * - [changeFileContent = FsUtils.changeFileContent](../classes/fs_utils.FsUtils.md#changeFileContent)
 * - [replaceInFile = FsUtils.replaceInFile](../classes/fs_utils.FsUtils.md#replaceInFile)
 * - [replaceInFilesWithEncoding = FsUtils.replaceInFilesWithEncoding](../classes/fs_utils.FsUtils.md#replaceInFilesWithEncoding)
 * - [replaceInFiles = FsUtils.replaceInFiles](../classes/fs_utils.FsUtils.md#replaceInFiles)
 * - [addSurroundingInFile = FsUtils.addSurroundingInFile](../classes/fs_utils.FsUtils.md#addSurroundingInFile)
 * - [replaceInFileWithFileContent = FsUtils.replaceInFileWithFileContent](../classes/fs_utils.FsUtils.md#replaceInFileWithFileContent)
 *
 * ## Exports
 *
 * @module
 */
import * as fs from 'fs';
import { promisify } from 'util';
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

export type ReplacementOrBuilder = string | ((matchPattern: RegExp, filePath: string) => string | PromiseLike<string>)
export type FileEncoding = Parameters<Buffer['toString']>['0'];

export abstract class FsUtils {
  /**
   * Escape the '$' sign in the string for using the string as the second argument to String.replace(...)
   * @param input the original string
   * @returns a new string with all '$' in the original string being replaced by '$$'
   */
  static escapeRegExpReplacement(input: string): string {
    return input.replace(/\$/g, '$$');
  }

  /**
   * Change the text file content.
   * This function loads the full content of the file into memory as string, so that it is not suitable for huge (for example, > 500MB) files.
   * If the new content and original content are the same, the file won't be touched.
   * @param filePath path to the file
   * @param transformContent function for getting the new file content
   * @param fileEncoding encoding of the file
   * @returns Promise of void
   */
  static async changeFileContent(filePath: string, transformContent: (originalContent: string, filePath: string) => string | PromiseLike<string>, fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    // eslint-disable-next-line unicorn/no-await-expression-member
    const originalContent = (await fsReadFile(filePath)).toString(fileEncoding);
    const newContent = await Promise.resolve(transformContent(originalContent, filePath));
    if (originalContent !== newContent) {
      await fsWriteFile(filePath, newContent);
    }
  }

  /**
   * Replace the matching sections in the text file.
   * @param filePath path to the file
   * @param matchPattern RegExp for deciding which section of the file would be replaced. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?`
   * @param replacementOrBuilder The replacement string or a function for building the replacement string.
   *                              Please note that you can use special replacement patterns but also you need to take care of the escaping.
   *                              For details of special replacement patterns see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
   * @param fileEncoding encoding of the file
   * @returns Promise of void
   */
  static async replaceInFile(filePath: string, matchPattern: RegExp, replacementOrBuilder: ReplacementOrBuilder, fileEncoding: FileEncoding = 'utf-8'): Promise<void> {
    await FsUtils.changeFileContent(
      filePath,
      fileContent => Promise.resolve(typeof replacementOrBuilder === 'string' ? replacementOrBuilder : replacementOrBuilder(matchPattern, filePath))
                            .then(replacementString => fileContent.replace(matchPattern, replacementString)),
      fileEncoding,
    );
  }

  /**
   * Replace the matching sections in multiple text files.
   * The replacing opertions on those files happen in parallel.
   * @param matchPattern RegExp for deciding which section of the file would be replaced. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?`
   * @param replacementOrBuilder The replacement string or a function for building the replacement string.
   *                              Please note that you can use special replacement patterns but also you need to take care of the escaping.
   *                              For details of special replacement patterns see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
   * @param fileEncoding encoding of the file, in most of the cases 'utf-8' should be used
   * @param filePaths patsh to the files
   * @returns Promise of void
   */
  static async replaceInFilesWithEncoding(matchPattern: RegExp, replacementOrBuilder: ReplacementOrBuilder, fileEncoding: FileEncoding, ...filePaths: string[]): Promise<void> {
    return Promise.all(filePaths.map(filePath => FsUtils.replaceInFile(filePath, matchPattern, replacementOrBuilder, fileEncoding))).then();
  }

  /**
   * Replace the matching sections in multiple utf-8 text files.
   * The replacing opertions on those files happen in parallel.
   * @param matchPattern RegExp for deciding which section of the file would be replaced. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?`
   * @param replacementOrBuilder The replacement string or a function for building the replacement string.
   *                              Please note that you can use special replacement patterns but also you need to take care of the escaping.
   *                              For details of special replacement patterns see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
   * @param filePaths patsh to the files
   * @returns Promise of void
   */
  static async replaceInFiles(matchPattern: RegExp, replacementOrBuilder: ReplacementOrBuilder, ...filePaths: string[]): Promise<void> {
    return FsUtils.replaceInFilesWithEncoding(matchPattern, replacementOrBuilder, 'utf-8', ...filePaths);
  }

  /**
   * Add surrounding content to the matching sections in the text file.
   * @param filePath path to the file
   * @param matchPattern RegExp for deciding which section of the file would be processed.
   *                    You must have a capturing group in the pattern.
   *                    You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?`
   * @param addBefore the string to be added before the capturing group, no need to escape anything
   * @param addAfter the string to be added before the capturing group, no need to escape anything
   * @param fileEncoding encoding of the file
   * @returns Promise of void
   */
  static async addSurroundingInFile(filePath: string, matchPattern: RegExp, addBefore: string, addAfter: string, fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    await FsUtils.changeFileContent(
      filePath,
      fileContent => fileContent.replace(matchPattern, FsUtils.escapeRegExpReplacement(addBefore ?? '') + '$1' + FsUtils.escapeRegExpReplacement(addAfter ?? '')),
      fileEncoding,
    );
  }

  /**
   * Replace the matching sections in the text file with content from another file.
   * @param filePath path of the file
   * @param matchPattern RegExp for deciding which section of the file would be replaced.
   *                    You must have a capturing group in the pattern.
   *                    You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?`
   * @param contentFilePath path of the file for getting the replacement content
   * @param fileEncoding encoding of the files
   * @returns Promise of void
   */
  static async replaceInFileWithFileContent(filePath: string, matchPattern: RegExp, contentFilePath: string, fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    await FsUtils.replaceInFile(
      filePath,
      matchPattern,
      () => fsReadFile(contentFilePath)
              .then(buffer => buffer.toString(fileEncoding))
              .then(content => FsUtils.escapeRegExpReplacement(content)),
      fileEncoding,
    );
  }
}

/** @ignore */
export const escapeRegExpReplacement = FsUtils.escapeRegExpReplacement;
/** @ignore */
export const changeFileContent = FsUtils.changeFileContent;
/** @ignore */
export const replaceInFile = FsUtils.replaceInFile;
/** @ignore */
export const replaceInFilesWithEncoding = FsUtils.replaceInFilesWithEncoding;
/** @ignore */
export const replaceInFiles = FsUtils.replaceInFiles;
/** @ignore */
export const addSurroundingInFile = FsUtils.addSurroundingInFile;
/** @ignore */
export const replaceInFileWithFileContent = FsUtils.replaceInFileWithFileContent;
