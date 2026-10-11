import QtQuick
import QtWebEngine

Window {
    width: 1280
    height: 800
    visible: true
    title: "ThingBlock Neo"

    WebEngineView {
        anchors.fill: parent
        url: webUrl
        settings.localContentCanAccessFileUrls: true
    }
}
