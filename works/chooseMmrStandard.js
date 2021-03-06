const response =  {
  "data": {
    "readPlayerMmr": {
      "_id": "mbcat#1703",
      "NA": {
        "QM": {
          "mmr": 2750,
          "games_played": 399
        },
        "SL": {
          "mmr": 2357,
          "games_played": 15
        }
      },
      "EU": null,
      "KR": {
        "QM": {
          "mmr": 2037,
          "games_played": 18
        },
        "SL": {
          "mmr": 2061,
          "games_played": 2
        }
      },
      "CN": null
    }
  }
}

const playerMmr = response.data.readPlayerMmr;

const chooseMmrStandard = (playerMmr) => {
	let listMinGames = [100, 40, 10, 1]
	let listRegion = ["NA", "KR", "EU", "CN"];
	let listMode = ["SL", "QM"];
	let listMmrStandard = [];
	
	
		listRegion.map((region)=>{
			listMode.map((mode)=>{
				listMinGames.map((minGames)=>{
				
				if (playerMmr[region] && 
							playerMmr[region][mode] &&
								playerMmr[region][mode]['games_played'] >= minGames) {
									
									//console.log(playerMmr[region][mode]['mmr'])
									
									listMmrStandard.push( playerMmr[region][mode]['mmr'] )
								}
				
				
			})
		})
	})
	
	if (listMmrStandard.length > 0) { 
		console.log(`mmrStandard: ${listMmrStandard[0]}`)
		return listMmrStandard[0] 
	}
	else {console.log("there is no mmr")}
}

chooseMmrStandard(playerMmr);



export default chooseMmrStandard