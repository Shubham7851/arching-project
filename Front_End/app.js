function formatINR(number) {
      return '₹' + number.toLocaleString('en-IN');
    }

    function calculateEstimate() {
      const projectType = document.getElementById('projectType').value;
      const area = parseFloat(document.getElementById('area').value);
      const floors = parseInt(document.getElementById('floors').value);
      const quality = document.getElementById('quality').value;
      const location = document.getElementById('location').value;
      const interior = document.getElementById('interior').value;
      const scope = document.getElementById('scope').value;

      if (!area || area <= 0) {
        alert('Please enter a valid area in sq. ft.');
        return;
      }

      let baseRate = 0;

      if (projectType === 'residential') baseRate = 1800;
      if (projectType === 'interior') baseRate = 1200;
      if (projectType === 'commercial') baseRate = 2200;
      if (projectType === 'renovation') baseRate = 1400;

      let qualityMultiplier = 1;
      if (quality === 'basic') qualityMultiplier = 0.9;
      if (quality === 'standard') qualityMultiplier = 1;
      if (quality === 'premium') qualityMultiplier = 1.25;
      if (quality === 'luxury') qualityMultiplier = 1.55;

      let locationMultiplier = 1;
      if (location === 'tier3') locationMultiplier = 0.95;
      if (location === 'tier2') locationMultiplier = 1.05;
      if (location === 'metro') locationMultiplier = 1.2;

      let floorMultiplier = 1 + ((floors - 1) * 0.08);

      let totalCost = area * baseRate * qualityMultiplier * locationMultiplier * floorMultiplier;

      let designCharges = totalCost * 0.06;

      let interiorCharges = 0;
      if (interior === 'yes') {
        interiorCharges = area * 350;
      }

      if (scope === 'design') {
        totalCost = designCharges + interiorCharges;
      } else {
        totalCost = totalCost + interiorCharges;
      }

      const lowerEstimate = Math.round(totalCost * 0.95);
      const upperEstimate = Math.round(totalCost * 1.08);

      let approxPerSqft = Math.round((upperEstimate / area));

      let timelineText = '';
      if (area <= 1000) timelineText = 'Estimated timeline: 3 to 6 months';
      else if (area <= 2500) timelineText = 'Estimated timeline: 6 to 10 months';
      else timelineText = 'Estimated timeline: 10 to 18 months';

      document.getElementById('estimatedPrice').innerText =
        `${formatINR(lowerEstimate)} - ${formatINR(upperEstimate)}`;

      document.getElementById('perSqftCost').innerText =
        `Approx. Cost per sq. ft.: ${formatINR(approxPerSqft)}`;

      document.getElementById('designFee').innerText =
        `Estimated architecture/design charges: ${formatINR(Math.round(designCharges))}`;

      document.getElementById('interiorCost').innerText =
        interior === 'yes'
          ? `Estimated interior cost: ${formatINR(Math.round(interiorCharges))}`
          : 'Estimated interior cost: Not included';

      document.getElementById('timeline').innerText = timelineText;

      document.getElementById('resultBox').style.display = 'block';
    }
    // ================= BACKEND CONNECTION =================

document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const project = document.getElementById("project").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("https://arching-backend.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        project,
        message
      })
    });

    const result = await response.text();
    alert(result);

  } catch (error) {
    console.error(error);
    alert("Error submitting form");
  }
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
