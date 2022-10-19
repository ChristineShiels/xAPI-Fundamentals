// var name = "Rufus Fuzzyfoot";
// let email = "rufus@annoyingcats.purr";

const newDate = "October 6, 2022 01:00:00";
const timeSince = new Date(newDate);

pageLoaded = () => {
    // alert("Hello there");
}

sendStarted = () => {
	const name = document.getElementById("nameEntered").value;
	const email = document.getElementById("userEmail").value;

	const statement = {
		actor: {
			mbox: "mailto:" + email,
			name: name,
			objectType: "Agent",
		},
		verb: {
			id: "http://w3id.org/xapi/dod-isd/verbs/started",
			display: { "en-US": "started" },
		},
		object: {
			id: "http://punklearning.com/xapi/simple_button",
			definition: {
				name: { "en-US": "Simple button started" },
				description: { "en-US": "User clicked start button" },
			},
			objectType: "Activity",
		},
	};

	// console.log(statement);
	// const stmt = JSON.parse(statement);

	ADL.XAPIWrapper.sendStatement(statement);

	console.log("Started");
};

sendInteracted = () => {
    const name = document.getElementById("nameEntered").value;
    const email = document.getElementById("userEmail").value;
    
    const statement = {
			"actor": {
				"mbox": "mailto:" + email,
				"name": name,
				"objectType": "Agent"
			},
			"verb": {
				"id": "http://adlnet.gov/expapi/verbs/interacted",
				"display": { "en-US": "interacted" }
			},
			"object": {
				"id": "http://punklearning.com/xapi/simple_button",
				"definition": {
					"name": { "en-US": "Simple button interact" },
					"description": { "en-US": "User clicked interact button" }
				},
                "objectType": "Activity"
			}
		};

        // console.log(statement);
        // const stmt = JSON.parse(statement);


    ADL.XAPIWrapper.sendStatement(statement);

    console.log("Interacted");
};

sendCompleted = () => {
	const name = document.getElementById("nameEntered").value;
	const email = document.getElementById("userEmail").value;

	const statement = {
		actor: {
			mbox: "mailto:" + email,
			name: name,
			objectType: "Agent",
		},
		verb: {
			id: "http://w3id.org/xapi/dod-isd/verbs/completed",
			display: { "en-US": "completed" },
		},
		object: {
			id: "http://punklearning.com/xapi/simple_button",
			definition: {
				name: { "en-US": "Simple button complete" },
				description: { "en-US": "User clicked complete button" },
			},
			objectType: "Activity",
		},
	};

	// console.log(statement);
	// const stmt = JSON.parse(statement);

	ADL.XAPIWrapper.sendStatement(statement);

	console.log("Completed");
};

generateData = () => {
    const interactedVerbs = getInteractedStatements();
    const intVerbsArr = ADL.XAPIWrapper.getStatements(interactedVerbs);

    if(intVerbsArr) {
        const intCount = intVerbsArr.statements.length;
        document.getElementById('interactionCount').innerHTML = intCount;
    }
}

getInteractedStatements = () => {
	const email = document.getElementById("userEmail").value;
	const myParams = ADL.XAPIWrapper.searchParams();
	myParams["since"] = timeSince.toISOString();
	myParams["verb"] = "http://adlnet.gov/expapi/verbs/interacted";
	myParams["activity"] = "http://punklearning.com/xapi/simple_button";
	myParams["agent"] = "{'mbox' : 'mailto:" + email + "'}";

	return myParams;
};