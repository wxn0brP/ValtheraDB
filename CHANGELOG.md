# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
