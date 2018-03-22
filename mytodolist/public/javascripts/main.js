require.config({
    baseUrl: "javascripts/",
    paths: {
        jquery: "jquery-3.3.1",

    },
    shim: {
        move: { exports: 'move' }
    }
})
require(['todolist']);