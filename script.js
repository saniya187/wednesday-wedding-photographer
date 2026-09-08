const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
menuToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  mobileMenu.style.transform = mobileMenu.classList.contains('open') ? 'translateX(0)' : '';
});
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  mobileMenu.style.transform = '';
}));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.image;
  lightboxImage.alt = item.querySelector('img').alt;
  lightboxCaption.textContent = item.dataset.caption;
  lightbox.classList.add('open');
}));
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.classList.remove('open'); });

document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(button => button.classList.remove('active'));
  filter.classList.add('active');
  const category = filter.dataset.filter;
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.display = category === 'all' || item.dataset.category === category ? '' : 'none';
  });
}));

const bookingModal = document.querySelector('.booking-modal');
const bookingForm = document.querySelector('#booking-form');
const confirmation = document.querySelector('.confirmation');
const steps = [...document.querySelectorAll('.form-step')];
let currentStep = 1;
function openBooking(packageName) {
  bookingModal.classList.add('open');
  body.classList.add('modal-active');
  if (packageName) {
    const option = [...document.querySelectorAll('input[name="package"]')].find(input => input.value === packageName);
    if (option) option.checked = true;
  }
}
document.querySelectorAll('[data-open-booking]').forEach(button => button.addEventListener('click', () => openBooking(button.dataset.package)));
function showStep(step) {
  currentStep = step;
  steps.forEach(item => item.classList.toggle('active', Number(item.dataset.step) === step));
  document.querySelectorAll('.steps span').forEach((item, index) => item.classList.toggle('active', index === step - 1));
}
document.querySelectorAll('.next-step').forEach(button => button.addEventListener('click', () => {
  const fields = steps[currentStep - 1].querySelectorAll('input[required]');
  if ([...fields].every(field => field.checkValidity())) showStep(Math.min(currentStep + 1, 4));
  else fields[0]?.reportValidity();
}));
bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  bookingForm.style.display = 'none';
  document.querySelector('.booking-header').style.display = 'none';
  confirmation.classList.add('show');
});
document.querySelector('.modal-close').addEventListener('click', () => bookingModal.classList.remove('open'));
document.querySelector('.modal-done').addEventListener('click', () => { bookingModal.classList.remove('open'); bookingForm.reset(); bookingForm.style.display = ''; document.querySelector('.booking-header').style.display = ''; confirmation.classList.remove('show'); showStep(1); });
bookingModal.addEventListener('click', event => { if (event.target === bookingModal) bookingModal.classList.remove('open'); });

document.querySelectorAll('.calendar-grid span:not(.muted)').forEach(day => day.addEventListener('click', () => {
  if (day.classList.contains('booked')) return;
  document.querySelectorAll('.calendar-grid span').forEach(item => item.classList.remove('selected'));
  day.classList.add('selected');
}));
document.addEventListener('mousemove', event => { const orb = document.querySelector('.cursor-orb'); if (orb) { orb.style.left = `${event.clientX}px`; orb.style.top = `${event.clientY}px`; } });