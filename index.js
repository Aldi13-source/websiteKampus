// Inisialisasi intl-tel-input untuk input telepon
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "auto",
    geoIpLookup: function(success, failure) {
        fetch('https://ipinfo.io?token=your_token_here')
            .then(response => response.json())
            .then(data => success(data.country))
            .catch(() => success("us"));
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});



// Mengambil data negara dari API
fetch('https://restcountries.com/v3.1/all')
.then(response => response.json())
.then(data => {
    const countrySelect = document.getElementById('country');
    const countrySearch = document.getElementById('countrySearch');

    // Urutkan negara berdasarkan nama
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));

    // Fungsi untuk menampilkan opsi negara
    function displayCountries(filteredData) {
        countrySelect.innerHTML = '<option value=<option value="" disabled selected>*Country</option>'; // Reset opsi
        filteredData.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2.toLowerCase();
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });
    }

    // Tampilkan semua negara yang telah diurutkan
    displayCountries(data);

    // Filter negara saat mengetik di input
    countrySearch.addEventListener('input', () => {
        const searchText = countrySearch.value.toLowerCase();
        const filteredCountries = data.filter(country =>
            country.name.common.toLowerCase().includes(searchText)
        );
        displayCountries(filteredCountries);
    });
})
.catch(error => console.error('Error fetching countries:', error));



// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
// Fungsi login dengan Google
const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        // Pengguna berhasil login
        console.log(result.user);
    } catch (error) {
        console.error("Error login:", error);
    }
};




function validatePassword() {
    const passwordInput = document.getElementById("inputPassword");
    const errorMessage = document.getElementById("error-message");
    const password = passwordInput.value;
    // Reset pesan kesalahan
    errorMessage.textContent = "";
    // Validasi panjang password
    if (password.length < 8 || password.length > 20) {
        errorMessage.textContent = "Password must be between 8 and 20 characters.";
    }
}
function login() {
    const passwordInput = document.getElementById("inputPassword");
    const errorMessage = document.getElementById("error-message");
    const password = passwordInput.value;
    // Validasi sebelum login
    if (password.length < 8 || password.length > 20) {
        errorMessage.textContent = "Password must be between 8 and 20 characters.";
        return; // Hentikan fungsi jika password tidak valid
    }
    // Arahkan ke home.html setelah login berhasil
    window.location.href = "home.html";
}



const carouselElement = document.querySelector('#carouselExampleIndicators');

// Inisialisasi carousel dengan opsi
const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 3000, // Interval waktu antara slide
    wrap: true // Mengizinkan carousel mengulangi slide
});

