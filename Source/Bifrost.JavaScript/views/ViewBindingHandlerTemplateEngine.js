﻿Bifrost.namespace("Bifrost.views", {
    ViewBindingHandlerTemplateEngine: Bifrost.Type.extend(function(engine, viewModelManager, element, viewUri, allBindingsAccessor) {
        var templateSource = Bifrost.views.ViewBindingHandlerTemplateSource.create({
            element: element,
            viewUri: viewUri,
            allBindingsAccessor: allBindingsAccessor
        });

        engine.renderTemplate = function (template, bindingContext, options) {
            templateSource.createAndSetViewModelFor(bindingContext, options.viewModelParameters);

            var renderedTemplateSource = engine.renderTemplateSource(templateSource, bindingContext, options);

            if (!Bifrost.isNullOrUndefined(bindingContext.$data)) {
                bindingContext.$root = bindingContext.$data;
            }
            
            viewModelManager.masterViewModel.setFor(element, bindingContext.$data);

            return renderedTemplateSource;
        }
    }),
    viewBindingHandlerTemplateEngine: {
        create: function (element, viewUri, allBindingsAccessor) {
            var engine = new ko.nativeTemplateEngine();
            Bifrost.views.ViewBindingHandlerTemplateEngine.create({
                engine: engine,
                element: element,
                viewUri: viewUri,
                allBindingsAccessor: allBindingsAccessor
            });
            return engine;
        }
    }
})