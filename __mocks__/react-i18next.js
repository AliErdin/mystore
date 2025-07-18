module.exports = {
  useTranslation: () => {
    return {
      t: (key, options) => (options && options.defaultValue) || key,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
};
