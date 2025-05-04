document.addEventListener("DOMContentLoaded", function () {
    const orgData = [
        { name: "Badan Eksekutif Mahasiswa (BEM)", Image: "Image/gambarBEM.jpg", description: "BEM adalah organisasi mahasiswa yang berperan dalam advokasi dan kegiatan kampus." },
        { name: "Majelis Perwakilan Mahasiswa (MPM)", Image: "Image/mpm.png", description: "MPM bertugas sebagai perwakilan mahasiswa dalam kebijakan kampus." },
        { name: "Spiritual Growth", Image: "Image/spiritual.jpg", description: "Organisasi yang mendukung pertumbuhan spiritual mahasiswa." },
        { name: "Nusantara Dance Company", Image: "Image/ndc.jpg", description: "Grup tari yang mempromosikan budaya Nusantara." },
        { name: "Lighthouse Singers", Image: "Image/lhs.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Artband", Image: "Image/artband.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Billiard", Image: "Image/billiard.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Nihon Utopia", Image: "Image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Mentoring", Image: "Image/mentoring.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "PHPC", Image: "Image/nihon.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Hana Union", Image: "Image/hanaunion.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Meng Club", Image: "Image/meng.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "UPH Choir", Image: "Image/uphchoir.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Movie Production Club", Image: "Image/mpc.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "E-Sport", Image: "Image/esports.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Pingpong", Image: "Image/pingpong.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Mahasiswa Pecinta Alam UPH", Image: "Image/mapala2.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Mana Proxia Theatre", Image: "Image/manaproxia.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Production Troops", Image: "Image/proops.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Service Learning Community (SLC)", Image: "Image/slc.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." },
        { name: "Ambassadors of UPH", Image: "Image/aou.jpg", description: "Kelompok paduan suara yang sering tampil dalam acara kampus." }
    ];

    const orgGrid = document.getElementById("orgGrid");
    const searchInput = document.getElementById("searchInput");
    const orgList = document.getElementById("orgList");
    const orgDetail = document.getElementById("orgDetail");
    const unitPage = document.getElementById("unitPage");
    const detailContent = document.getElementById("detailContent");
    const unitContent = document.getElementById("unitContent");
    const allActivitiesBtn = document.getElementById("allActivitiesBtn");
    const unitButtons = document.querySelectorAll(".sidebar .btn[data-unit]");
    const allButtons = document.querySelectorAll(".sidebar .btn");


    function renderOrganizations(filter = "") {
        orgGrid.innerHTML = "";
        const filteredData = orgData.filter(org => org.name.toLowerCase().includes(filter.toLowerCase()));

        filteredData.forEach(org => {
            const card = document.createElement("div");
            card.classList.add("card", "hidden-element"); // Start hidden for animation
            card.style.backgroundImage = `url('${org.Image}')`;
            card.innerHTML = `<h4>${org.name}</h4>`;
            card.addEventListener("click", () => showOrgDetail(org));
            orgGrid.appendChild(card);
        });

        // Ensure animation applies after cards are inserted into the DOM
        setTimeout(() => applyScrollAnimation(), 100);
    }

    function showOrgDetail(org) {
        orgList.classList.add("hidden");
        orgDetail.classList.remove("hidden");
        unitPage.classList.add("hidden");

        detailContent.innerHTML = `
            <h2>${org.name}</h2>
            <img src="${org.Image}" alt="${org.name}" style="width: 100%; border-radius: 8px; margin-bottom: 10px;">
            <p>${org.description}</p>
        `;
    }

    function showUnitContent(unitName) {
        orgList.classList.add("hidden");
        orgDetail.classList.add("hidden");
        unitPage.classList.remove("hidden");

        // Remove previous unit styles
        unitPage.classList.remove("unit-ukm", "unit-ulm", "unit-ok");
        unitPage.classList.add(`unit-${unitName}`);

        const unitDescriptions = {
            "ukm": ["Artband", "Nusantara Dance Company", "Lighthouse Singers", "Spirit Dance Company", "Mana Proxia Theatre", "Hana Union", "Meng Club", "Billiard", "E-Sports", "Production Troops",
                    "Nihon Utopia", "Mentoring", "Movie Production Club", "Pingpomg", "Mahasiswa Pecinta Alam UPH"],            
            "ulm": ["Majelis Perwakilan Mahasiswa (MPM)", "Badan Eksekutif Mahasiswa (BEM)", "Student Learning Community (SLC)"],
            "ok": ["Spiritual Growth", "Nihon Utopia"]
        };

        unitContent.innerHTML = `
            <h2>${unitName.toUpperCase()}</h2>
            <p>${unitDescriptions[unitName]}</p>
            <div class="grid" id="filteredOrgGrid"></div>
        `;

        // Show only activities related to the selected unit
        renderFilteredOrganizations(unitName);
    }

    function renderFilteredOrganizations(unitType) {
        const filteredOrgGrid = document.getElementById("filteredOrgGrid");
        filteredOrgGrid.innerHTML = "";

        const unitOrganizations = {
            "ukm": ["Artband", "Nusantara Dance Company", "Lighthouse Singers", "Spirit Dance Company", "Mana Proxia Theatre", "Hana Union", "Meng Club", "Billiard", "E-Sports", "Production Troops",
                "Nihon Utopia", "Mentoring", "Movie Production Club", "Pingpomg", "Mahasiswa Pecinta Alam UPH"],            
        "ulm": ["Mentoring", "Spiritual Growth", "Student Learning Community (SLC)"],
        "ok": ["Majelis Perwakilan Mahasiswa (MPM)", "Badan Eksekutif Mahasiswa (BEM)"]
        };

        const filteredData = orgData.filter(org => unitOrganizations[unitType].includes(org.name));

        filteredData.forEach(org => {
            const card = document.createElement("div");
            card.classList.add("card", "hidden-element"); // Start hidden for animation
            card.style.backgroundImage = `url('${org.Image}')`;
            card.innerHTML = `<h4>${org.name}</h4>`;
            card.addEventListener("click", () => showOrgDetail(org));
            filteredOrgGrid.appendChild(card);
        });

        // Ensure animation applies after cards are inserted into the DOM
        setTimeout(() => applyScrollAnimation(), 100);
    }

    function applyScrollAnimation() {
        const elementsToAnimate = document.querySelectorAll(".content .btn, .content .card");

        // Ensure elements start hidden
        elementsToAnimate.forEach(el => el.classList.add("hidden-element"));

        // Create Intersection Observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show"); // Make visible
                    entry.target.classList.remove("hidden-element"); // Ensure visibility
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, { threshold: 0.2 });

        // Observe each element
        elementsToAnimate.forEach(element => observer.observe(element));
    }

    function showOrgList() {
        orgDetail.classList.add("hidden");
        unitPage.classList.add("hidden");
        orgList.classList.remove("hidden");
    }

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            renderOrganizations(e.target.value);
        }
    });
    

    // Tombol "Semua Kegiatan Mahasiswa" menampilkan kembali daftar organisasi
    allActivitiesBtn.addEventListener("click", function () {
        window.location.href = "semua-kegiatan.html"; // tab yang sama
    });    

    // Fungsi untuk menampilkan konten unit kegiatan di halaman yang sama
    unitButtons.forEach(button => {
        button.addEventListener("click", function () {
            const unitName = button.dataset.unit;
            window.location.href = `${unitName}.html`; // arahkan ke halaman yang sesuai di tab yang sama
        });
    });    

    window.addEventListener("scroll", function () {
        const videoContainer = document.querySelector(".video-container");

        if (window.scrollY > videoContainer.clientHeight) {
            document.body.classList.add("hidden-top-bar");
        } else {
            document.body.classList.remove("hidden-top-bar");
        }
    });

    function setActiveButton(clickedBtn) {
        allButtons.forEach(btn => btn.classList.remove("active"));
        clickedBtn.classList.add("active");
    }    
    
    function updateBreadcrumb(text) {
        const breadcrumb = document.getElementById("breadcrumb");
        breadcrumb.innerHTML = `<a href="semua-kegiatan.html">Semua Kegiatan Mahasiswa</a> → ${text}`;
    }    

    // Run animation on first load
    applyScrollAnimation();

    // Initial render
    renderOrganizations();
});

