import ejs from 'ejs';

const people: string[] = ['gourab', 'milan', 'rishabh'];

const template = '<%= people.join("|") %>';

console.log(ejs.render(template, { people }));
