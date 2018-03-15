
var designFunctions = {
    pageCreator: function(jsonIN){
        const markup = `
            <div class="content-holder">
                <h2>Overview</h2>
                <p>${jsonIN.plot}</p>
                ${jsonIN.actors.map(actor => `<li>${actor}</li>`).join(' ')}
            </div>`;
        return markup;
    }
}