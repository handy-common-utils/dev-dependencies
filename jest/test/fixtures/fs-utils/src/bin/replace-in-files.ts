#!/usr/bin/env node

/**
 * @module
 * @ignore
 */

import { FsUtils } from '../fs-utils';

const [,, matchPattern, replacement, ...filePaths] = process.argv;

FsUtils.replaceInFiles(new RegExp(matchPattern), replacement, ...filePaths);
