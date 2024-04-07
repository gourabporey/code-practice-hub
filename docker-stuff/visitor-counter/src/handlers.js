const handleVisitorCount = (client) => (_, res) => {
  client.get('visits', (err, visits) => {
    if (err) return res.json({ error: "Error Occurred" });
    const updatedVisits = parseInt(visits || 0) + 1; // Handle initial visits value
    res.json({ visits: updatedVisits });
    client.set('visits', updatedVisits);
  });
};

module.exports = { handleVisitorCount };