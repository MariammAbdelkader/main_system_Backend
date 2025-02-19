const whois = require('whois');
const { promisify } = require('util');
const whoisLookup = promisify(whois.lookup);

const checkDomainAvailability = async (domain)=> {
    try {
        const data = await whoisLookup(domain);
        if (data.includes('No match') || data.includes('NOT FOUND')) {
            return true; 
        } else {
            return false; 
        }
    } catch (error) {
        console.error('Error checking domain availability:', error);
        return false;
    }
}

// Example usage
(async () => {
    const domain = 'facebook.com';
    const isAvailable = await checkDomainAvailability(domain);
    console.log(`${domain} is ${isAvailable ? 'available' : 'not available'}`);
})();

module.exports = {checkDomainAvailability};