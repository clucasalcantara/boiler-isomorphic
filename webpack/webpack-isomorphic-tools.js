const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
  assets: {
    style_modules: {
      extensions: ['styl'],
      filter: (module, regex, options, log) => {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }
        // in production mode there's no webpack "style-loader",
        // so the module.name will be equal to the asset path
        return regex.test(module.name);
      },
      path: (module, options, log) => {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }
        return module.name;
      },
      parser: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }
        // in production mode there's Extract Text Loader which extracts CSS text away
        return module.source;
      },
    },
  },
};
