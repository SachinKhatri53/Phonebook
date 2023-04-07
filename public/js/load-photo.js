function displaySelectedPhoto(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = document.getElementById('selected-photo');
        img.src = event.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  