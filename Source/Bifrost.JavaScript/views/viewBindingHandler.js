Bifrost.namespace("Bifrost.views", {

    viewBindingHandler: Bifrost.Type.extend(function (UIManager, viewManager, viewModelManager, documentService) {
        var self = this;

        var templateEnginesByUri = {};

        function getTemplateEngineFor(viewUri, element, allBindingsAccessor) {
            var uri = ko.utils.unwrapObservable(viewUri);
            if (Bifrost.isNullOrUndefined(uri)) return null;

            var key = uri;
            if (templateEnginesByUri.hasOwnProperty(key)) {
                return templateEnginesByUri[key];
            } else {
                var engine = Bifrost.views.viewBindingHandlerTemplateEngine.create(element, viewUri, allBindingsAccessor);
                templateEnginesByUri[key] = engine;
                return engine;
            }
        }

        function makeTemplateValueAccessor(element, valueAccessor, allBindingsAccessor) {
            return function () {
                var viewUri = valueAccessor();
                var viewModel = viewModelManager.masterViewModel.getFor(element);
                var viewModelParameters = allBindingsAccessor().viewModelParameters || {};
                return {
                    if: true,
                    data: viewModel,
                    templateEngine: getTemplateEngineFor(viewUri, element, allBindingsAccessor),
                    viewModelParameters : viewModelParameters
                }
            };
        };

        this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            return ko.bindingHandlers.template.init(element, makeTemplateValueAccessor(element, valueAccessor, allBindingsAccessor), allBindingsAccessor, viewModel, bindingContext);
        };
        this.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            return ko.bindingHandlers.template.update(element, makeTemplateValueAccessor(element, valueAccessor, allBindingsAccessor), allBindingsAccessor, viewModel, bindingContext);
        };
    })
});
Bifrost.views.viewBindingHandler.initialize = function () {
    ko.bindingHandlers.view = Bifrost.views.viewBindingHandler.create();
    ko.jsonExpressionRewriting.bindingRewriteValidators.view = false; // Can't rewrite control flow bindings
    ko.virtualElements.allowedBindings.view = true;
};