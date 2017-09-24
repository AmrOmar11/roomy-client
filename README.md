This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start mySideMenu sidemenu
```

Then, to run it, cd into `mySideMenu` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

1.below are common git commands
check-out: git clone 'url'
check-in:
	git add .
	git commit -m "comment"
	git push -u origin master

status: git status
difference:git diff
update: git pull origin master

2.preparing production apk:https://ionicframework.com/docs/intro/deploying/

ionic cordova build android --prod --release

keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias

set in below location in environament variables
C:\Users\%user%\AppData\Local\Android\sdk\build-tools\26.0.0

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks android-release-unsigned.apk my-alias

zipalign -v 4 android-release-unsigned.apk HelloWorld.apk

apksigner verify HelloWorld.apk