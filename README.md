# Parcel Template for jQuery

これは jQuery 用の Parcel Template です。

* [parcel](https://parceljs.org/)
* [jquery](https://jquery.com/)

プログラミングを学びはじめた人向けに提供しています。

<!-- TOC -->

* [Parcel Template for jQuery](#parcel-template-for-jquery)
  * [使用方法](#使用方法)
  * [ビルドする](#ビルドする)
  * [Github Pages に公開する](#github-pages-に公開する)
  * [オプション](#オプション)
    * [パッケージをアップデート](#パッケージをアップデート)

<!-- /TOC -->

## 使用方法

1.  レポジトリを複製

```
$ git clone https://github.com/hrdtbs/template-parcel-jquery.git
$ cd template-parcel-jquery
```

2.  `.git`フォルダを削除

MaxOS、Linux の場合

```
$ rm -rf .git
```

Windows の場合

```
$ rd /s /q .git
```

3.  モジュールをインストール

npm の場合

```
$ npm install
```

yarn の場合

```
$ yarn
```

4.  開発

npm の場合

```
$ npm run start
```

yarn の場合

```
$ yarn start
```

## ビルドする

```
$ yarn build
```

## Github Pages に公開する

```
$ yarn deploy:gh-pages
```

## オプション

### パッケージをアップデート

npm の場合

```
$ npm update --save --latest
```

yarn の場合

```
$ yarn upgrade --latest
```

最新のバージョンで動かない場合は教えてください。
