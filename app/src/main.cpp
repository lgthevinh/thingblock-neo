#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QUrl>
#include <QtWebEngineQuick>

int main(int argc, char *argv[])
{
    QtWebEngineQuick::initialize();
    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    // Dev-only: load the editor straight from the source tree; switch to bundled resources when packaging.
    engine.rootContext()->setContextProperty(
        "webUrl", QUrl::fromLocalFile(QStringLiteral(WEB_ROOT "/index.html")));
    engine.loadFromModule("ThingBlock", "Main");
    return app.exec();
}
