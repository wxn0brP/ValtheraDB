# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.5.4](https://github.com/wxn0brP/ValtheraDB/compare/v0.5.3...v0.5.4) (2025-04-13)


### Features

* add logo to README and include SVG file ([9d2fb6f](https://github.com/wxn0brP/ValtheraDB/commit/9d2fb6fb039995988d63ab6088c756dbbc2e5d44))
* export MemoryAction class for external usage ([4da2f95](https://github.com/wxn0brP/ValtheraDB/commit/4da2f958e4bbefd626e5d833b08ae05644dfa77e))

### [0.5.3](https://github.com/wxn0brP/ValtheraDB/compare/v0.5.2...v0.5.3) (2025-04-09)


### Features

* add custom command to remove scripts from package.json in build workflow ([ff9a5b4](https://github.com/wxn0brP/ValtheraDB/commit/ff9a5b44585e8e7dd27e1098845b889108347298))
* add data validation check in processRelations function ([b3843ec](https://github.com/wxn0brP/ValtheraDB/commit/b3843ec4a54f27200a897bd4c2610c5f94967b7a))
* extend DBS interface to support DataBaseRemote type ([0c4840d](https://github.com/wxn0brP/ValtheraDB/commit/0c4840d2799610a3b0878dc8101ac86651a50f9b))


### Bug Fixes

* handle undefined select parameter in selectDataSelf function ([0c7889b](https://github.com/wxn0brP/ValtheraDB/commit/0c7889b009626e871e7f08c28eda778876b418a8))

### [0.5.2](https://github.com/wxn0brP/ValtheraDB/compare/v0.5.1...v0.5.2) (2025-04-08)


### Features

* add findStream method for streaming data retrieval ([6b061cb](https://github.com/wxn0brP/ValtheraDB/commit/6b061cb059a2a85ac22eda0de67967d6561e4d64))
* refactor relation types into a separate module ([7a5031f](https://github.com/wxn0brP/ValtheraDB/commit/7a5031fecb565171c050792e2c769e3ce8cf7494))

### [0.5.1](https://github.com/wxn0brP/ValtheraDB/compare/v0.5.0...v0.5.1) (2025-04-06)

## [0.5.0](https://github.com/wxn0brP/ValtheraDB/compare/v0.4.2...v0.5.0) (2025-04-06)


### ⚠ BREAKING CHANGES

* organize exports
* refactor relation

### Features

* add createMemoryValthera ([98d7e91](https://github.com/wxn0brP/ValtheraDB/commit/98d7e91c02027e9c2dace69593f4fe81b13f39f2))
* add GitHub Actions workflow for nightly builds and releases ([800432f](https://github.com/wxn0brP/ValtheraDB/commit/800432f2ff333adce2fc45c52bf56a0087aacddd))
* enhance GitHub Actions ([7df8c22](https://github.com/wxn0brP/ValtheraDB/commit/7df8c228228b390275af8d21527e03ad9987a3de))
* export RelationConfig interface ([5c03fbc](https://github.com/wxn0brP/ValtheraDB/commit/5c03fbcea0d8e96bf9067e15a376f44ad4f8c7be))
* refactor relation ([a3f8ad4](https://github.com/wxn0brP/ValtheraDB/commit/a3f8ad4b72c06c73158bb3e8b28e16d8279394cd))
* update GitHub Actions workflow to include additional files for publishing ([51bbf4a](https://github.com/wxn0brP/ValtheraDB/commit/51bbf4a9a1e83a2d991c7b2782369d73340aafc0))


### Bug Fixes

* update import statement for EventEmitter to use named import ([1889f4d](https://github.com/wxn0brP/ValtheraDB/commit/1889f4dee008448fb1233e485eb6d8201cbbfd87))


* organize exports ([6f22eae](https://github.com/wxn0brP/ValtheraDB/commit/6f22eaedef9c0ad1faf68eb0ef14cbc611859636))

### [0.4.2](https://github.com/wxn0brP/ValtheraDB/compare/v0.4.1...v0.4.2) (2025-03-26)


### Features

* add transaction to DataBaseRemote ([da638f2](https://github.com/wxn0brP/ValtheraDB/commit/da638f2b28a80957de8146b7a0205b53de9b4ca1))
* enhance data assignment logic in updateOne method for improved object handling ([e954d84](https://github.com/wxn0brP/ValtheraDB/commit/e954d84013632e6063d4ec8871c4905902f34f27))
* implement transaction ([9dd06dc](https://github.com/wxn0brP/ValtheraDB/commit/9dd06dc7fa6d5bbe9a97a60fae84ec2f6173a8c2))
* refactor database operations to use centralized execution method with event emission ([cf143c7](https://github.com/wxn0brP/ValtheraDB/commit/cf143c702a1c22bcc56aad4e76b139dd34cd1e3d))


### Bug Fixes

* integrate executor for database operations ([49d04d0](https://github.com/wxn0brP/ValtheraDB/commit/49d04d0f12fb547e6204f8dce909bc5f4d63ed6e))
* update build workflow to include package.json ([b77bf14](https://github.com/wxn0brP/ValtheraDB/commit/b77bf145c5d1d80c4e99244d91a2539a6af93944))

### [0.4.1](https://github.com/wxn0brP/ValtheraDB/compare/v0.4.0...v0.4.1) (2025-03-21)


### Bug Fixes

* operationUpdater bug ([e255dd2](https://github.com/wxn0brP/ValtheraDB/commit/e255dd23deef6f4b3ce25f57d4cea5278869101f))

## [0.4.0](https://github.com/wxn0brP/ValtheraDB/compare/v0.3.4...v0.4.0) (2025-03-19)


### Bug Fixes

* update prepare script to clean dist directory before build ([e8ad88a](https://github.com/wxn0brP/ValtheraDB/commit/e8ad88ab6b2c3cd82d361848de7a4ab76be97eb8))

### [0.3.4](https://github.com/wxn0brP/ValtheraDB/compare/v0.3.3...v0.3.4) (2025-03-19)


### Features

* add export alias ([60d5386](https://github.com/wxn0brP/ValtheraDB/commit/60d5386ea8d254afcbd5aadb373b6bde3d57f592))
* implement in-memory database ([d72e6da](https://github.com/wxn0brP/ValtheraDB/commit/d72e6da42d171e2e443ded5b9d6521e94303d33e))


### Bug Fixes

* types ([9693b1b](https://github.com/wxn0brP/ValtheraDB/commit/9693b1b4aae12835e5eb1aff7db2d6d1911818d4))

### [0.3.3](https://github.com/wxn0brP/ValtheraDB/compare/v0.3.2...v0.3.3) (2025-03-09)


### Bug Fixes

* custom file CPU ([e031273](https://github.com/wxn0brP/ValtheraDB/commit/e031273c83c9c058c1d1372ca0e7b3d7c5abdbbf))

### [0.3.2](https://github.com/wxn0brP/ValtheraDB/compare/v0.3.1...v0.3.2) (2025-03-07)


### Bug Fixes

* checkCollection ([b60fc77](https://github.com/wxn0brP/ValtheraDB/commit/b60fc772c5ad650f5e977020bab4b8c0c8cbfde8))

### [0.3.1](https://github.com/wxn0brP/ValtheraDB/compare/v0.3.0...v0.3.1) (2025-03-06)


### Bug Fixes

* types ([a63b117](https://github.com/wxn0brP/ValtheraDB/commit/a63b11782508fe722aab42ed87c66045678a46bd))
* update workflow ([60b6dca](https://github.com/wxn0brP/ValtheraDB/commit/60b6dcafedc8fb6c38b327cde6a11d93805c9df7))

## [0.3.0](https://github.com/wxn0brP/ValtheraDB/compare/v0.2.0...v0.3.0) (2025-03-06)


### ⚠ BREAKING CHANGES

* removed deprecated CJS support

### Features

* build cdn workflow ([f9c55da](https://github.com/wxn0brP/ValtheraDB/commit/f9c55dad53f84235a8748531ee32865204cc5fe8))
* update workflow ([877858d](https://github.com/wxn0brP/ValtheraDB/commit/877858d44516bc0ff105350c885ff6a497f716fa))


* removed deprecated CJS support ([7e76330](https://github.com/wxn0brP/ValtheraDB/commit/7e7633059cc6e369067d70f9ac1da363cc999b00))

## [0.2.0](https://github.com/wxn0brP/ValtheraDB/compare/v0.1.2...v0.2.0) (2025-02-28)


### ⚠ BREAKING CHANGES

* remove duplicated code

### Bug Fixes

* incorrect argument order in updateOneOrAdd call ([cdf58a0](https://github.com/wxn0brP/ValtheraDB/commit/cdf58a06471f62f1bb4f8de0a1bd7edd376b943e))
* operationUpdater, getSortedFiles, and getLastFile; replaced fs sync with fs.promises ([1e948ae](https://github.com/wxn0brP/ValtheraDB/commit/1e948ae4a84012c914a0279188c7a955150ecfa8))


* remove duplicated code ([599b0aa](https://github.com/wxn0brP/ValtheraDB/commit/599b0aa6517692cf1d2c5ac4f95926becc8df682))

### [0.1.2](https://github.com/wxn0brP/ValtheraDB/compare/v0.1.1...v0.1.2) (2025-02-25)


### Features

* add browser client support ([9d63a0e](https://github.com/wxn0brP/ValtheraDB/commit/9d63a0e00198b9482e3aa052f45852517348a0c6))


### Bug Fixes

* browser support ([cc71262](https://github.com/wxn0brP/ValtheraDB/commit/cc7126241797b030c43121db808a27fa396421b4))
* CustomFileCpu update and remove operations ([d198ae2](https://github.com/wxn0brP/ValtheraDB/commit/d198ae29cabc1b7449ebcc810107122ff079cb27))

### [0.1.1](https://github.com/wxn0brP/ValtheraDB/compare/v0.1.0...v0.1.1) (2025-02-25)


### Features

* add CustomFileCpu to simplify custom storage format implementation ([0093dfc](https://github.com/wxn0brP/ValtheraDB/commit/0093dfc949fd3c80367ff94c9eceafef8731d373))
* add support for custom file CPU implementations ([2d757fd](https://github.com/wxn0brP/ValtheraDB/commit/2d757fd6b97dbc727e8c3051c69b87926bf7ab29))


### Bug Fixes

* add function for custom file CPU implementations ([120fc0f](https://github.com/wxn0brP/ValtheraDB/commit/120fc0f43681dfba0da13fe8a0804b5442ae680c))

## [0.1.0](https://github.com/wxn0brP/database/compare/v0.0.8...v0.1.0) (2025-02-21)


### ⚠ BREAKING CHANGES

* upgrade id generator

### Features

* update remote client, migrate `got` to `ky` ([3eb5d25](https://github.com/wxn0brP/database/commit/3eb5d25f464fd107201c1ad9231704e1a6069bed))
* upgrade id generator ([0e92abf](https://github.com/wxn0brP/database/commit/0e92abfd811dfe2fe4571273f5fa1099a20d9b2b))


### Bug Fixes

* relation ([c5e62bd](https://github.com/wxn0brP/database/commit/c5e62bdc9bbc5d7a2c3d6f7a3844c08d3c534d80))
* type on collection manager ([24c2061](https://github.com/wxn0brP/database/commit/24c2061646fe6b2ea70b62c62180a28204506d2c))

### [0.0.8](https://github.com/wxn0brP/database/compare/v0.0.7...v0.0.8) (2025-01-17)


### Features

* add updater to md book ([5c988f3](https://github.com/wxn0brP/database/commit/5c988f3ec765dd7ce6f015733bc16953fa48cb7c))


### Bug Fixes

* Context type ([e7a54e9](https://github.com/wxn0brP/database/commit/e7a54e9998592f35c55e53f12fcaa59115e722f9))
* types ([87548f0](https://github.com/wxn0brP/database/commit/87548f00f3e59c63ea7d7128177b1bbb0b8c3960))
* types ([1061092](https://github.com/wxn0brP/database/commit/1061092b980e5d347984f9c02cb61703b73ef895))

### [0.0.7](https://github.com/wxn0brP/database/compare/v0.0.6...v0.0.7) (2025-01-17)


### Features

* add .vscode to gitignore ([af6451f](https://github.com/wxn0brP/database/commit/af6451fe1857786810a35c2abc73a6f58ed00ea7))
* add predefined update utility functions ([e667703](https://github.com/wxn0brP/database/commit/e667703444944ebbf7f6d2747804d4f0fe3a92ce))


### Bug Fixes

* export types on index ([16e3dbb](https://github.com/wxn0brP/database/commit/16e3dbb4627bc9c64c78e9a753f6af7667e10008))
* exports ([907360a](https://github.com/wxn0brP/database/commit/907360ad9920530886c8b0b6c0cdad01a7843026))
* types ([d8194a2](https://github.com/wxn0brP/database/commit/d8194a29d8602ef7c6ebe4567a30d8d24f65da4a))
* types ([01cc0eb](https://github.com/wxn0brP/database/commit/01cc0eba9d03e54686fa8d0ac3aafee540786d7b))

### [0.0.6](https://github.com/wxn0brP/database/compare/v0.0.5...v0.0.6) (2024-12-27)


### Features

* ts type ([a0d7eb0](https://github.com/wxn0brP/database/commit/a0d7eb089643bc12b7da26b952aaa9d3a3b57d86))


### Bug Fixes

* add middleware to serialize functions for remote database find options ([1fa5f05](https://github.com/wxn0brP/database/commit/1fa5f05c7b6e82710e8b78034c773665fdb6a56a))
* functions in server ([a9af1af](https://github.com/wxn0brP/database/commit/a9af1af9d75b4893431b7c0692cc00f733398428))
* link in docs ([8d3f09e](https://github.com/wxn0brP/database/commit/8d3f09ef593756265d7307e4508448e88beec0de))
* update mdbook ([296b225](https://github.com/wxn0brP/database/commit/296b22582df675652ed9bec756a292c35e8265b2))
