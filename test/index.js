// test drive development, find the best to use it API, and design the API internal

import krShell from 'krShell'

/**
 * krShell is the base, krEditor is based on krShell.
 * and webapp with krEditor to do what?
 *
 * - pano should be much like a special image browser, like image browser, this is a browser specific to pano image
 * - besides pano browse, user should be able to do some additional things according to business, like COMMENT, LIKE, and SHARE
 */

/**
 * the best way to use krShell
 *
 * ? how to load plugin ?
 *
 * pano
 *  - preview
 *  - image
 *  - level
 *  - view
 *  - scene
 *
 *  loadScene(name, {
 *      preview: '',
 *      image: '',
 *      ...
 *  })
 *
 *  or
 *
 *  var scene = new krShell.Scene({name: '', preview: '', image: '', ...})
 *  krShell.loadScene(name)
 *  krShell.getScene(name)
 *  krShell.activeScene;
 *
 *  scene.preview....
 *  scene.image...
 *  scene.view...
 *
 *
 *
 *  events / callback
 *
 * hotspot
 *  var hotspot = new krShell.Hotspot(name, options);
 *  activeScene.addHotspot(hotspot);
 *
 * layer
 *
 * plugin
 *
 */
// the web page i want to show, is a kind of editor of pano
// so the first thing user needs to do is upload a pano image
// then image will be cut at back-end and stored in cloud
// store the pano image information together with the default pano SETTINGS
    // default SETTINGS would be something like:
    // view, controls, ....

// web page load the pano with uploaded image and default SETTINGS, give the user a pano edit mode page
    // so there should be a pano editor plugin, which should based on krShell

// in pano edit mode, use can do
    // 1. hotspot:
    //      1.1 add hotspot
    //      1.2 remove hotspot
    //      1.3 move fixed hotspot
    //      1.4 label hotspot
    //      1.5 icon hotspot
    //      1.6 link hotspot with URL
    //      1.7 link hotspot with another pano
    // 2. video:
    //      2.1 add video
    //      2.2 remove video
    //      2.3 move video
    //      2.4
    // 3. audio:
    //      3.1 add audio
    //      3.2 remove audio
    //      3.3 set audio play mode
    //      3.4 set audio control style
    // 4. map:
    //      4.1 add map
    //      4.2 remove map
    //      4.3 sync map direction with pano
    // 5. action menu control:
    //      after user done the editing, this pano should be meant to share to others, so they can view and comment and sth
    //      so the action menu control is to define how user wants his pano to be interacted, like not allow comments