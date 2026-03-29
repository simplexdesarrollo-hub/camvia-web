async function testFetch() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjkyLCJlbWFpbCI6ImpncmF1c2FsYXphcjlAZ21haWwuY29tIiwicm9sIjoiQ2xpZW50IiwiaWF0IjoxNzc0NTMzMDM2LCJleHAiOjE3NzUxMzc4MzZ9.FRJ3Kfy5QZyl7UxMMx4xveEfy05T5Q0cpgTNPKNUC_k';
  const url = 'https://apis.simplexlatam.com/apps/services/v1/camvia/company/home';
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Data keys:", Object.keys(data));
    console.log("Package length:", data.package?.length);
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}
testFetch();
