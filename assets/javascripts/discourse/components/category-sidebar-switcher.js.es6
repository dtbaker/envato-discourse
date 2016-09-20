import { setting } from 'discourse/lib/computed';

var get = Ember.get;

export default Ember.Component.extend({
  classNameBindings: [':category-sidebar','categoryClass'],
  currentCategory: Em.computed.or('secondCategory', 'firstCategory'),
  categoryId: null,

  categoryName: 'div',

  categories: function() {
    return Discourse.Site.currentProp('categories').sort();
  }.property('site.categories'),

  categoryClass: function() {
    if (this.get('categoryId')) {
      return "category-" + this.get('categoryId');
    } else {
      return "category_all";
    }
  }.property('categoryId'),

  allcategoriesUrl: function() {
    if (this.get('currentCategory')) {
      return this.get('currentCategory.url') + "?allcategories=1";
    } else {
      return "/";
    }
  }.property('firstCategory', 'secondCategory'),

  allcategoriesLabel: function() {
    return I18n.t("categoryging.selector_all_categories");
  }.property('category'),

  clickEventName: function() {
    return "click.category-sidebar-" + (this.get('category') || "all");
  }.property('category'),

  removeEvents: function(){
    $('html').off(this.get('clickEventName'));
    this.$('a[data-drop-close]').off('click.category-sidebar');
  },

  close: function() {
    this.removeEvents();
  },

  willDestroyElement: function() {
    this.removeEvents();
  }

});
