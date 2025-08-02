# @handy-common-utils/fs-utils

File system operations related utilities without any 3rd party dependency.

[![Version](https://img.shields.io/npm/v/@handy-common-utils/fs-utils.svg)](https://npmjs.org/package/@handy-common-utils/fs-utils)
[![Downloads/week](https://img.shields.io/npm/dw/@handy-common-utils/fs-utils.svg)](https://npmjs.org/package/@handy-common-utils/fs-utils)
[![CI](https://github.com/handy-common-utils/fs-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/handy-common-utils/fs-utils/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/handy-common-utils/fs-utils/branch/master/graph/badge.svg?token=W08QCZS9H1)](https://codecov.io/gh/handy-common-utils/fs-utils)

## How to use

First add it as a dependency:

```sh
npm install @handy-common-utils/fs-utils
```

Then you can use it in the code:

```javascript
import { FsUtils } from '@handy-common-utils/fs-utils';

const [,, filePath, matchPattern, beforeString, afterString] = process.argv;
await FsUtils.addSurroundingInFile(filePath, new RegExp(matchPattern), beforeString, afterString);
```

You can either import and use the [class](#classes) as shown above,
or you can import individual [functions](#variables) directly like below:

```javascript
import { addSurroundingInFile } from 'fs-utils';

await addSurroundingInFile(README_MD_FILE, /<example>(.*?)<\/example>/gms, '<example><b>', '</b></example>');
```

There are also several commands you can use directly from your shell/build scripts:

- **replace-in-file** `filePath` `matchPattern` `replacement`
- **replace-in-files** `matchPattern` `replacement` `file1` `file2` `file3` ...
- **replace-in-file-with-file-content** `filePath` `matchPattern` `contentFilePath`
- **add-surrounding-in-file** `filePath` `matchPattern` `beforeString` `afterString`

# API

<!-- API start -->
<a name="readmemd"></a>

## fs-utils

### Re-exports

#### Functions

- [escapeRegExpReplacement = FsUtils.escapeRegExpReplacement](#api-escaperegexprreplacement)
- [changeFileContent = FsUtils.changeFileContent](#api-changefilecontent)
- [replaceInFile = FsUtils.replaceInFile](#api-replaceinfile)
- [replaceInFilesWithEncoding = FsUtils.replaceInFilesWithEncoding](#api-replaceinfileswithencoding)
- [replaceInFiles = FsUtils.replaceInFiles](#api-replaceinfiles)
- [addSurroundingInFile = FsUtils.addSurroundingInFile](#api-addsurroundinginfile)
- [replaceInFileWithFileContent = FsUtils.replaceInFileWithFileContent](#api-replaceinfilewithfilecontent)

### Exports

### Classes

| Class | Description |
| ------ | ------ |
| [FsUtils](#classesfsutilsmd) | - |

### Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [FileEncoding](#type-aliasesfileencodingmd) | - |
| [ReplacementOrBuilder](#type-aliasesreplacementorbuildermd) | - |

## Classes


<a id="classesfsutilsmd"></a>

### Abstract Class: FsUtils

#### Constructors

<a id="api-constructor"></a>

##### Constructor

> **new FsUtils**(): `FsUtils`

###### Returns

`FsUtils`

#### Methods

<a id="api-addsurroundinginfile"></a>

##### addSurroundingInFile()

> `static` **addSurroundingInFile**(`filePath`, `matchPattern`, `addBefore`, `addAfter`, `fileEncoding`): `Promise`\<`void`\>

Add surrounding content to the matching sections in the text file.

###### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `filePath` | `string` | `undefined` | path to the file |
| `matchPattern` | `RegExp` | `undefined` | RegExp for deciding which section of the file would be processed. You must have a capturing group in the pattern. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
| `addBefore` | `string` | `undefined` | the string to be added before the capturing group, no need to escape anything |
| `addAfter` | `string` | `undefined` | the string to be added before the capturing group, no need to escape anything |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` | encoding of the file |

###### Returns

`Promise`\<`void`\>

Promise of void

***

<a id="api-changefilecontent"></a>

##### changeFileContent()

> `static` **changeFileContent**(`filePath`, `transformContent`, `fileEncoding`): `Promise`\<`void`\>

Change the text file content.
This function loads the full content of the file into memory as string, so that it is not suitable for huge (for example, > 500MB) files.
If the new content and original content are the same, the file won't be touched.

###### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `filePath` | `string` | `undefined` | path to the file |
| `transformContent` | (`originalContent`, `filePath`) => `string` \| `PromiseLike`\<`string`\> | `undefined` | function for getting the new file content |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` | encoding of the file |

###### Returns

`Promise`\<`void`\>

Promise of void

***

<a id="api-escaperegexpreplacement"></a>

##### escapeRegExpReplacement()

> `static` **escapeRegExpReplacement**(`input`): `string`

Escape the '
 sign in the string for using the string as the second argument to String.replace(...)

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | the original string |

###### Returns

`string`

a new string with all '
 in the original string being replaced by '$'

***

<a id="api-replaceinfile"></a>

##### replaceInFile()

> `static` **replaceInFile**(`filePath`, `matchPattern`, `replacementOrBuilder`, `fileEncoding`): `Promise`\<`void`\>

Replace the matching sections in the text file.

###### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `filePath` | `string` | `undefined` | path to the file |
| `matchPattern` | `RegExp` | `undefined` | RegExp for deciding which section of the file would be replaced. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
| `replacementOrBuilder` | [`ReplacementOrBuilder`](#type-aliasesreplacementorbuildermd) | `undefined` | The replacement string or a function for building the replacement string. Please note that you can use special replacement patterns but also you need to take care of the escaping. For details of special replacement patterns see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` | encoding of the file |

###### Returns

`Promise`\<`void`\>

Promise of void

***

<a id="api-replaceinfiles"></a>

##### replaceInFiles()

> `static` **replaceInFiles**(`matchPattern`, `replacementOrBuilder`, ...`filePaths`): `Promise`\<`void`\>

Replace the matching sections in multiple utf-8 text files.
The replacing operations on those files happen in parallel.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `matchPattern` | `RegExp` | RegExp for deciding which section of the file would be replaced. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
| `replacementOrBuilder` | [`ReplacementOrBuilder`](#type-aliasesreplacementorbuildermd) | The replacement string or a function for building the replacement string. Please note that you can use special replacement patterns but also you need to take care of the escaping. For details of special replacement patterns see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace |
| ...`filePaths` | `string`[] | path to the files |

###### Returns

`Promise`\<`void`\>

Promise of void

***

<a id="api-replaceinfileswithencoding"></a>

##### replaceInFilesWithEncoding()

> `static` **replaceInFilesWithEncoding**(`matchPattern`, `replacementOrBuilder`, `fileEncoding`, ...`filePaths`): `Promise`\<`void`\>

Replace the matching sections in multiple text files.
The replacing operations on those files happen in parallel.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `matchPattern` | `RegExp` | RegExp for deciding which section of the file would be replaced. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
| `replacementOrBuilder` | [`ReplacementOrBuilder`](#type-aliasesreplacementorbuildermd) | The replacement string or a function for building the replacement string. Please note that you can use special replacement patterns but also you need to take care of the escaping. For details of special replacement patterns see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace |
| `fileEncoding` | `undefined` \| `string` | encoding of the file, in most of the cases 'utf-8' should be used |
| ...`filePaths` | `string`[] | path to the files |

###### Returns

`Promise`\<`void`\>

Promise of void

***

<a id="api-replaceinfilewithfilecontent"></a>

##### replaceInFileWithFileContent()

> `static` **replaceInFileWithFileContent**(`filePath`, `matchPattern`, `contentFilePath`, `fileEncoding`): `Promise`\<`void`\>

Replace the matching sections in the text file with content from another file.

###### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `filePath` | `string` | `undefined` | path of the file |
| `matchPattern` | `RegExp` | `undefined` | RegExp for deciding which section of the file would be replaced. You must have a capturing group in the pattern. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?` |
| `contentFilePath` | `string` | `undefined` | path of the file for getting the replacement content |
| `fileEncoding` | `undefined` \| `string` | `'utf-8'` | encoding of the files |

###### Returns

`Promise`\<`void`\>

Promise of void

## Type Aliases


<a id="type-aliasesfileencodingmd"></a>

### Type Alias: FileEncoding

> **FileEncoding** = `Parameters`\<`Buffer`\[`"toString"`\]\>\[`"0"`\]


<a id="type-aliasesreplacementorbuildermd"></a>

### Type Alias: ReplacementOrBuilder

> **ReplacementOrBuilder** = `string` \| (`matchPattern`, `filePath`) => `string` \| `PromiseLike`\<`string`\>
<!-- API end -->
