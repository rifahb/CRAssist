// const vault = require('node-vault')({
//   apiVersion: 'v1', // default
//   endpoint: process.env.VAULT_ADDR || 'http://127.0.0.1:8200',
//   token: process.env.VAULT_TOKEN,
// });

// async function getSecrets() {
//   try {
//     // Read secret at secret/myapp/config (KV v2)
//     const result = await vault.read('secret/data/myapp/config');
//     // KV v2 stores actual data under 'data.data'
//     const secrets = result.data.data;
//     return secrets;
//   } catch (err) {
//     console.error('Error fetching secrets:', err.message);
//     throw err;
//   }
// }


// module.exports = { getSecrets };


const vault = require('node-vault')({
  apiVersion: 'v1', // default
  endpoint: process.env.VAULT_ADDR || 'http://127.0.0.1:8200',
  token: process.env.VAULT_TOKEN,
});

async function getSecrets() {
  try {
    // KV v2 path to read your secrets from Vault
    const result = await vault.read('secret/data/myapp/config');
    // Vault KV v2 stores secret values inside result.data.data
    return result.data.data;
  } catch (err) {
    console.error('Error fetching secrets from Vault:', err.message);
    throw err;
  }
}

module.exports = { getSecrets };
