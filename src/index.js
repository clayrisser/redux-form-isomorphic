export default class ReduxFormIsomorphic {
  constructor(store, forms) {
    this.forms = forms;
    this.store = store;
  }

  rehydrate() {
    const state = this.store.getState();
    Object.keys(this.forms).forEach(formName => {
      this.forms[formName].forEach(fieldName => {
        this.rehydrateField(formName, fieldName, state);
      });
    });
  }

  rehydrateField(formName, fieldName, state) {
    if (!state) state = this.store.getState();
    const { dispatch } = this.store;
    const { document } = window;
    const form = document.querySelector(`form[name=${formName}]`);
    if (!form) return null;
    const field = form.querySelector(`[name=${fieldName}]`);
    if (!field) return null;
    const { value } = field;
    dispatch({
      type: '@@redux-form/REGISTER_FIELD',
      meta: {
        form: formName
      },
      payload: {
        name: fieldName,
        type: 'Field'
      }
    });
    dispatch({
      type: '@@redux-form/CHANGE',
      meta: {
        form: formName,
        field: fieldName
      },
      payload: value
    });
    return null;
  }
}
