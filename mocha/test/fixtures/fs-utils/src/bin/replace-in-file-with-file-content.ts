#!/usr/bin/env node

/**
 * @module
 * @ignore
 */

import { FsUtils } from '../fs-utils';

const [,, filePath, matchPattern, contentFilePath] = process.argv;

FsUtils.replaceInFileWithFileContent(filePath, new RegExp(matchPattern), contentFilePath);
