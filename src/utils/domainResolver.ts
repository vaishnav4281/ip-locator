
// Simple domain to IP resolution using a public DNS-over-HTTPS service
export const resolveDomainToIP = async (domain: string): Promise<string> => {
  // If it's already an IP address, return it as is
  const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (ipRegex.test(domain)) {
    return domain;
  }

  try {
    // Use Cloudflare's DNS-over-HTTPS service to resolve domain to IP
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
      headers: {
        'Accept': 'application/dns-json'
      }
    });
    
    if (!response.ok) {
      throw new Error('DNS resolution failed');
    }
    
    const data = await response.json();
    
    if (data.Answer && data.Answer.length > 0) {
      // Return the first A record
      return data.Answer[0].data;
    }
    
    throw new Error('No A record found');
  } catch (error) {
    console.error(`Failed to resolve domain ${domain}:`, error);
    throw new Error(`Could not resolve domain: ${domain}`);
  }
};
