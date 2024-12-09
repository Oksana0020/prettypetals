const bcrypt = require('bcryptjs');

const providedPassword = 'Aa12345';
const storedHash = '<COPY_HASH_FROM_DATABASE>'; // Replace with the new hash from the database

bcrypt.compare(providedPassword, storedHash, (err, isMatch) => {
  if (err) {
    console.error('Error comparing password:', err);
  } else {
    console.log('Password Match:', isMatch);
  }
});
