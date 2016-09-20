import { setting } from 'discourse/lib/computed';

var get = Ember.get;

export default Ember.Component.extend({
  classNameBindings: [':category-sidebar','categoryClass'],
  currentCategory: Em.computed.or('secondCategory', 'firstCategory'),
  categoryId: null,

  parentCategory: function() {
      return this.get('category');
  }.property('category','parentCategory'),

  categoryName: 'div',

  subcategories: function() {
    var all_categories = Discourse.Site.currentProp('categories').sort();
      var sub_categories = [];
      for(var i in all_categories){
          if(all_categories.hasOwnProperty(i) && all_categories[i].parent_category_id == this.get('category.id')){
              sub_categories.push(all_categories[i]);
          }
      }
      return sub_categories;
  }.property('site.subcategories'),

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
