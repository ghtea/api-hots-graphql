import axios from 'axios'

const test = async () => {
	const _id = "alarak"
	const res = await axios.get(`https://heroes-talents.avantwing.com/hero/${_id}.json`);
  const hero = res.data;

	console.log(hero["name"])
}

test();