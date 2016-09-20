import DiscourseURL from 'discourse/lib/url';

export default Ember.Component.extend({
  tagName: 'a',
  classNameBindings: [':category-badge-wrapper', ':badge-wrapper', ':bullet', 'categoryClass'],
  attributeBindings: ['href'],

  href: function() {
    var url = '';
    if (this.get('category')) {
      url += '/c/' + this.get('category.slug') + '?allTags=1';
    }
    return url;
  }.property('categoryId', 'category.id'),

  categoryClass: function() {
    return "category-" + this.get('category.id');
  }.property('categoryId'),

  render(buffer) {
    buffer.push(Handlebars.Utils.escapeExpression(this.get('category.name')));
  },

  click(e) {
    e.preventDefault();
    DiscourseURL.routeTo(this.get('href'));
    return true;
  }
});
