import { setting } from 'discourse/lib/computed';

var get = Ember.get;

export default Ember.Component.extend({
  classNameBindings: [':tag-sidebar','tagClass'],
  currentCategory: Em.computed.or('secondCategory', 'firstCategory'),
  tagId: null,

  tagName: 'div',

    thisCategory: function(){
      return this.get('category');
    }.property('thisCategory'),

  tags: function() {
      // get tags based on current category.
    if (this.siteSettings.tags_sort_alphabetically && Discourse.Site.currentProp('top_tags')) {
      return Discourse.Site.currentProp('top_tags').sort();
    } else {
      return Discourse.Site.currentProp('top_tags');
    }
  }.property('site.top_tags'),

  tagClass: function() {
    if (this.get('tagId')) {
      return "tag-" + this.get('tagId');
    } else {
      return "tag_all";
    }
  }.property('tagId'),

  allTagsUrl: function() {
    if (this.get('currentCategory')) {
      return this.get('currentCategory.url') + "?allTags=1";
    } else {
      return "/";
    }
  }.property('firstCategory', 'secondCategory'),

  allTagsLabel: function() {
    return I18n.t("tagging.selector_all_tags");
  }.property('tag'),

  clickEventName: function() {
    return "click.tag-sidebar-" + (this.get('tag') || "all");
  }.property('tag'),

  removeEvents: function(){
    $('html').off(this.get('clickEventName'));
    this.$('a[data-drop-close]').off('click.tag-sidebar');
  },

  close: function() {
    this.removeEvents();
  },

  willDestroyElement: function() {
    this.removeEvents();
  }

});
