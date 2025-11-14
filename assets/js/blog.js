'use strict';

// Simple post data; could be swapped for API or JSON file later
const posts = {
  '1': {
    title: 'Going to the gym for the first time',
    date: '2022-07-07',
    dateText: '7 July 2022',
    image: './assets/images/blog-1.jpg',
    body: `
      <p>Starting your fitness journey can be exciting and intimidating. Here are some tips to make your first gym visit successful:</p>
      <ul>
        <li>Have a plan: focus on 4-6 basic movements (squat, hinge, push, pull, carry, core).</li>
        <li>Start light: pick weights you can move with control for 10-12 reps.</li>
        <li>Ask for help: coaches and staff can assist with equipment and form.</li>
        <li>Warm up and cool down: 5-10 min each to prep and recover.</li>
      </ul>
      <p>Stick to 2-3 sessions per week for the first month, and increase gradually. Consistency is king.</p>
    `
  },
  '2': {
    title: 'Parturient accumsan cacus pulvinar magna',
    date: '2022-07-07',
    dateText: '7 July 2022',
    image: './assets/images/blog-2.jpg',
    body: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor lorem nec pretium sodales.</p>
      <p>Proin a nisl vitae lacus molestie condimentum. Integer scelerisque lectus non diam convallis, vitae mollis felis dictum.</p>
      <p>Maecenas et sapien nec eros auctor tincidunt. Vivamus vehicula fringilla est, vitae imperdiet ligula fermentum vitae.</p>
    `
  },
  '3': {
    title: 'Risus purus namien parturient accumsan cacus',
    date: '2022-07-07',
    dateText: '7 July 2022',
    image: './assets/images/blog-3.jpg',
    body: `
      <p>Donec euismod, nisi vel consectetur blandit, neque lorem rhoncus turpis, sit amet efficitur velit enim in nulla.</p>
      <p>Vestibulum vel urna efficitur, fermentum tortor a, ultricies arcu. Suspendisse in ex non mauris tempus venenatis.</p>
      <p>Quisque non lacus non ipsum luctus sagittis at vitae dui. Curabitur ac orci velit. Integer dignissim purus ut venenatis hendrerit.</p>
    `
  }
};

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

(function ($) {
  $(function () {
    const id = getParam('post') || '1';
    const post = posts[id] || posts['1'];

    $('#post-title').text(post.title);
    $('#post-image').attr('src', post.image).attr('alt', post.title);
    $('#post-date').attr('datetime', post.date).text(post.dateText);
    $('#post-body').html(post.body);
  });
})(jQuery);
