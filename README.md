# Phosphor Snippet

  

This application, called [Phosphor](https://www.phosphor.xyz/developer) Snippets, is an attempt to put together a collection of JavaScript/TypeScript snippets to make it easy to interact with the [Phosphor API](https://docs.consensys-nft.com/latest-admin-api).

  
Each snippet is provided with documentation, an official API link, and TypeScript definitions of the function parameters related to the snippet.

  

## Project Structure

  

The Phosphor snippets are located inside the `packages/phosphor` directory.

  

## Running the Application

  

You can run the Next.js application located in the `frontend` directory.

  

## Getting Started

  

First, navigate to the `frontend` directory:

  

```bash

cd  frontend

  ```
```bash

npm  install

# or

yarn  install
```
  
```bash
npm  run  dev
```
  

Open  http://localhost:3000  with  your  browser  to  see  the  result.vMarkdown  Preview  EnhancedMarkdown  Preview  Enhanced

  

## Contributing

  

Contributions  are  welcome!  Feel  free  to  submit  a  pull  request.

  

### Adding New Snippets

  

To  add  new  snippets,  create  a  JavaScript  file  inside  the  `phosphor`  directory  with  appropriate  functions.  Use  [JSDoc](https://jsdoc.app/)  comments  so  that  the  frontend  app  can  pick  up  new  snippets  as  well  as  data  such  as  title,  description,  and  docs,  etc.
example:

```
/**

* Creates a collection.

* @title Create Collection with platform contract

* @description get started with one of phosphor's platform contracts

* @param  {CreateCollectionInput}  data - The data to create the collection with.

* @returns  {Promise} - A promise that resolves when the collection is created.

* @docs https://docs.consensys-nft.com/platform-features/digital-asset-creation/collections/create-a-collection

* @api https://docs.consensys-nft.com/latest-admin-api#tag/Collection/paths/~1v1~1collections/post

*/
```

Also you can use JSDoc to add types too. For an example  param `CreateCollectionInput` 
in above function is defined as;

```
/**

* @typedef  {Object}  CreateCollectionInput

* @property  {string}  name

* @property  {string}  [description]

* @property  {DeploymentRequest}  deploymentRequest

* @property  {string}  [defaultItemTypeId]

* @property  {boolean}  [editableMetadata]

* @property  {string}  [externalLink]

* @property  {string}  [imageUrl]

* @property  {boolean}  [isPublic]

* @property  {CollectionMedia}  [media]

* @property  {Object | any[] | number | string | boolean | null}  [previewMetadata]

* @property  {"INSTANT" | "DELAYED"}  [revealStrategy]

*/
```
This JSDoc comments are converted to typescript types when building the `phosphor` directory

In  order  to  make  a  file  a  module  so  that  it  has  a  separate  collection  of  snippets,  add  a  comment  like  this  at  the  very  top  of  the  file:

  