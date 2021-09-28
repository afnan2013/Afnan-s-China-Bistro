const seasons = document.querySelectorAll(".season");
// console.log(seasons);

const bgs = document.querySelectorAll(".bg");
// console.log(bgs);

seasons.forEach((season)=>{
	if(season.id==="Winter"){
		season.style.backgroundColor = "rgba(0,0,255, 0.3)";
		season.innerHTML = "Winter";
	}

	if(season.id==="Spring"){
		season.style.backgroundColor = "rgba(0,255,255, 0.3)";
		season.innerHTML = "Spring";
	}

	if(season.id==="Summer"){
		season.style.backgroundColor = "rgba(255,150,155, 0.3)";
		season.innerHTML = "Summer";
	}

	if(season.id==="Fall"){
		season.style.backgroundColor = "rgba(55,150,155, 0.3)";
		season.innerHTML = "Fall";
	}

	const textAnime = document.querySelectorAll(".text-anime");
	//console.log(textAnime);

	const brandText = document.getElementById("brandText");
	//console.log(brandText);

	season.addEventListener("mouseenter", ()=>{
		season.style.opacity = 0;

		if (season.id === "Winter"){
			bgs.forEach((bg)=>{
				if(bg.classList.contains("Winter")){
					bg.style.filter = "none";
				}
			});

			brandText.style.opacity = 0;
		}


		if (season.id === "Spring"){
			bgs.forEach((bg)=>{
				if(bg.classList.contains("Spring")){
					bg.style.filter = "none";
				}
			});
		}

		if (season.id === "Summer"){
			bgs.forEach((bg)=>{
				if(bg.classList.contains("Summer")){
					bg.style.filter = "none";
				}
			});
		}

		if (season.id === "Fall"){
			bgs.forEach((bg)=>{
				if(bg.classList.contains("Fall")){
					bg.style.filter = "none";
				}
			});
		}



		textAnime.forEach((text)=>{
			text.style.display = "block";
		});
		
	});


	season.addEventListener("mouseleave", ()=>{
		season.style.opacity = 0.5;

		if (season.id === "Winter"){
			bgs.forEach((bg)=>{
				if(bg.classList.contains("Winter")){
					bg.style.filter = "blur(8px)";
				}
			});

			brandText.style.opacity = 1;
		}

		if (season.id === "Spring"){
			bgs.forEach((bg)=>{
				if(bg.classList.contains("Spring")){
					bg.style.filter = "blur(8px)";
				}
			});
		}

		if (season.id === "Summer"){
			bgs.forEach((bg)=>{
				if(bg.classList.contains("Summer")){
					bg.style.filter = "blur(8px)";
				}
			});
		}

		if (season.id === "Fall"){
			bgs.forEach((bg)=>{
				if(bg.classList.contains("Fall")){
					bg.style.filter = "blur(8px)";
				}
			});
		}


		textAnime.forEach((text)=>{
			text.style.display = "none";
		});
	});
});




