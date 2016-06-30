CKEditor 5 Hackathon
========================================

[![devDependency Status](https://david-dm.org/ckeditor/ckeditor5-hackathon/dev-status.svg)](https://david-dm.org/ckeditor/ckeditor5-hackathon#info=devDependencies)

CKEditor 5 Hackathon is a 2-day event for CKEditor 5 core developers. Our goal is to implement  proof-of-concepts of some [cool features](https://github.com/ckeditor/ckeditor5-hackathon/issues) to see capabilities of the new [CKEditor 5 engine](https://github.com/ckeditor/ckeditor5-hackathon) in action.

More information about the CKEditor 5 can be found at the following url: <https://github.com/ckeditor/ckeditor5>.

## Results

### Selective Undo

* Feature name: `selective-undo`
* Issue: https://github.com/ckeditor/ckeditor5-hackathon/issues/3
* Code: https://github.com/ckeditor/ckeditor5-hackathon/compare/selective-undo

<img src="https://raw.githubusercontent.com/ckeditor/ckeditor5-hackathon/master/media/selective-undo.gif" alt="Screencast of the selective undo feature for CKEditor 5">

### Editable Table of Contents

* Feature name: `table-of-contents`
* Issue: https://github.com/ckeditor/ckeditor5-hackathon/issues/2
* Code: https://github.com/ckeditor/ckeditor5-hackathon/compare/table-of-contents

<img src="https://raw.githubusercontent.com/ckeditor/ckeditor5-hackathon/master/media/table-of-contents.gif" alt="Screencast of the editable table of contents feature for CKEditor 5">

### Markdown Editor

* Feature name: `markdown-editor`
* Issue: https://github.com/ckeditor/ckeditor5-hackathon/issues/4
* Code: https://github.com/ckeditor/ckeditor5-hackathon/compare/markdown-editor

<img src="https://raw.githubusercontent.com/ckeditor/ckeditor5-hackathon/master/media/markdown-editor.gif" alt="Screencast of the markdown editor feature for CKEditor 5">

<img src="https://raw.githubusercontent.com/ckeditor/ckeditor5-hackathon/master/media/markdown-editor-2.gif" alt="Screencast of the markdown editor feature for CKEditor 5">

### Suggestion Mode

* Feature name: `suggestion-mode`
* Issue: https://github.com/ckeditor/ckeditor5-hackathon/issues/7
* Code: https://github.com/ckeditor/ckeditor5-hackathon/compare/suggestion-mode

<img src="https://raw.githubusercontent.com/ckeditor/ckeditor5-hackathon/master/media/suggestion-mode.gif" alt="Screencast of the suggestion mode feature for CKEditor 5">

### Text Transformations

* Feature name: `text-transformation`
* Issue: https://github.com/ckeditor/ckeditor5-hackathon/issues/8
* Code: https://github.com/ckeditor/ckeditor5-hackathon/compare/text-transformation

<img src="https://raw.githubusercontent.com/ckeditor/ckeditor5-hackathon/master/media/text-transformation.gif" alt="Screencast of the text transformations feature for CKEditor 5">

### Autocompletion (suggestions)

* Feature name: `autocomplete`
* Issue: https://github.com/ckeditor/ckeditor5-hackathon/issues/6
* Code: https://github.com/ckeditor/ckeditor5-hackathon/compare/autocomplete

<img src="https://raw.githubusercontent.com/ckeditor/ckeditor5-hackathon/master/media/autocomplete.gif" alt="Screencast of the autocompletion feature for CKEditor 5">

### Graphical Representation of the Model

* Feature name: `graphical-model-representation`
* Issue: https://github.com/ckeditor/ckeditor5-hackathon/issues/1
* Code: https://github.com/ckeditor/ckeditor5-hackathon/compare/graphical-model-representation

<img src="https://raw.githubusercontent.com/ckeditor/ckeditor5-hackathon/master/media/graphical-model-representation.gif" alt="Screencast of the graphical model representation feature for CKEditor 5">

### Content Length Limit

* Feature name: `limit`
* Issue: https://github.com/ckeditor/ckeditor5-hackathon/issues/5
* Code: https://github.com/ckeditor/ckeditor5-hackathon/compare/limit

<img src="https://raw.githubusercontent.com/ckeditor/ckeditor5-hackathon/master/media/limit.gif" alt="Screencast of the contents length limit (Twitter like) feature for CKEditor 5">

## Installation

**NOTE**: Hackathon took place in June 2016 and since then the CKEditor 5 API might have dramatically changed (at the moment CKEditor 5 is still in a development phase). Hence, instead of really building CKEditor from source, the below steps show how to use a precompiled version of CKEditor which is [uploaded in this repository](https://github.com/ckeditor/ckeditor5-hackathon/tree/master/build).

In order to run the demo live you need to:

1. Setup the project (this will take a while):

```
git clone git@github.com:ckeditor/ckeditor5.git
cd ckeditor5
git co hackathon/<feature-name>
npm i
sudo npm i -g gulp benderjs-cli
gulp init
```

2. Copy the build of the editor from the hackathon repository to `ckeditor5/`.

```
cd ..
rm -rf ckeditor5/build
cp -R ckeditor5-hackathon/build ckeditor5
```

3. Start the testing environment:

```
cd ../ckeditor5/
bender server run
```

and visit `http://localhost:1030/build/amd/tests/hackathon/manual/<feature-name>` using Chrome (the only supported browser at that moment).

## License

Licensed under the GPL, LGPL and MPL licenses, at your choice. For full details about the license, please check the `LICENSE.md` file.
