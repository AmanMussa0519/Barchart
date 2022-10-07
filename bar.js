function reloadPage() {
    window.location.reload();
}


async function tempHigh() {

    const data = await d3.json("./my_weather_data.json")
    const tempAccessor = (d) => d.temperatureHigh;

    const yAccessor = d => d.length;

    var min = Math.min(...data.map(e => e.temperatureHigh))
    console.log(min)

    var max = Math.max(...data.map(e => e.temperatureHigh))
    console.log(max)

    const width = 600
    let dimensions = {
        width: width,
        height: width * 0.6,
        margin: {
            top: 20,
            right: 30,
            bottom: 20,
            left: 30,
        },
    }

    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom

    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("translate",`translate(${dimensions.margin.left}px,${dimensions.margin.top+-100}px)`);

    const xScaler = d3.scaleLinear()
        .domain([-50,100])
        .range([0,dimensions.boundedWidth])
        .nice()

    const binsGen = d3.bin()
        .domain(xScaler.domain())
        .value(tempAccessor)
        .thresholds(12);

    const bins = binsGen(data);
    console.log(bins);

    const yScaler = d3.scaleLinear()
        .domain([min, max])
        .range([dimensions.boundedHeight,0])

    const binGroup = bounds.append("g");

    const binGroups = binGroup.selectAll("g")
        .data(bins)
        .enter()
        .append("g");

    const barPadding = 1
    const barRect = binGroups.append("rect")
        .attr("x", d => xScaler(d.x0) + barPadding/20)
        .attr("y", d => yScaler(yAccessor(d)))
        .attr("width", d => d3.max([0, xScaler(d.x1) - xScaler(d.x0) - barPadding]))
        .attr("height", d => dimensions.boundedHeight - yScaler(yAccessor(d)))
        .attr("fill", "#AAAAEE");

    const mean = d3.mean(data,tempAccessor);
    console.log(mean);

    const meanLabe = bounds.append("text")
        .attr("x",dimensions.boundedWidth+15)
        .attr("y",dimensions.boundedHeight/2)
        .text("Mean")
        .attr("fill","maroon")
        .attr("font-size","12px")
        .attr("text-anchor","middle");

    const yLabel = bounds.append("text")
        .attr("x",dimensions.boundedWidth-30)
        .attr("y",50)
        .text("Count")
        .attr("fill","black")
        .attr("font-size","15px")
        .attr("text-anchor","middle");

    const xLabel = bounds.append("text")
        .attr("x",60)
        .attr("y",dimensions.boundedHeight-10)
        .text("Temperature -> ")
        .attr("fill","black")
        .attr("font-size","15px")
        .attr("text-anchor","middle");

    const xAxisGen = d3.axisBottom()
        .scale(xScaler);
    const xAxis = bounds.append("g")
        .call(xAxisGen)
        .style("transform",`translateY(${dimensions.boundedHeight}px)`);

    const yAxisGen = d3.axisLeft()
        .scale(yScaler);

    const yAxis = bounds.append("g")
        .call(yAxisGen)
        .style("transform",`translateX(${dimensions.boundedWidth}px)`);

    const meanLine1 = bounds.append("line")
        .attr("x2", dimensions.boundedWidth)
        .attr("y1", dimensions.boundedHeight/2)
        .attr("y2", dimensions.boundedHeight/2)
        .attr("stroke","black")
        .attr("stroke-dasharray","2px 4px");

    const barText = binGroups.filter(yAccessor)
        .append("text")
        .attr("x", d => xScaler(d.x0) + (xScaler(d.x1)-xScaler(d.x0))/2)
        .attr("y", d => yScaler(yAccessor(d)) - 5)
        .text(yAccessor)
        .attr("fill","black")
        .attr("font-size","16px")
        .attr("text-anchor","middle");

}


async function tempMin() {

    const data = await d3.json("./my_weather_data.json")
    const tempAccessor = (d) => d.temperatureMin;

    const yAccessor = d => d.length;

    var min = Math.min(...data.map(e => e.temperatureMin))
    console.log(min)

    var max = Math.max(...data.map(e => e.temperatureMin))
    console.log(max)

    const width = 600
    let dimensions = {
        width: width,
        height: width * 0.6,
        margin: {
            top: 20,
            right: 30,
            bottom: 20,
            left: 30,
        },
    }
    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom

    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("translate",`translate(${dimensions.margin.left}px,${dimensions.margin.top+-100}px)`);

    const xScaler = d3.scaleLinear()
        .domain([-50,100])
        .range([0,dimensions.boundedWidth])
        .nice()

    const binsGen = d3.bin()
        .domain(xScaler.domain())
        .value(tempAccessor)
        .thresholds(12);

    const bins = binsGen(data);
    console.log(bins);

    const yScaler = d3.scaleLinear()
        .domain([min, max])
        .range([dimensions.boundedHeight,0])

    const binGroup = bounds.append("g");

    const binGroups = binGroup.selectAll("g")
        .data(bins)
        .enter()
        .append("g");

    const barPadding = 1
    const barRect = binGroups.append("rect")
        .attr("x", d => xScaler(d.x0) + barPadding/20)
        .attr("y", d => yScaler(yAccessor(d)))
        .attr("width", d => d3.max([0, xScaler(d.x1) - xScaler(d.x0) - barPadding]))
        .attr("height", d => dimensions.boundedHeight - yScaler(yAccessor(d)))
        .attr("fill", "#AAAAEE");

    const mean = d3.mean(data,tempAccessor);
    console.log(mean);

    const meanLabe = bounds.append("text")
        .attr("x",dimensions.boundedWidth+15)
        .attr("y",dimensions.boundedHeight/2)
        .text("Mean")
        .attr("fill","maroon")
        .attr("font-size","12px")
        .attr("text-anchor","middle");

    const yLabel = bounds.append("text")
        .attr("x",dimensions.boundedWidth-30)
        .attr("y",50)
        .text("Count")
        .attr("fill","black")
        .attr("font-size","15px")
        .attr("text-anchor","middle");

    const xLabel = bounds.append("text")
        .attr("x",60)
        .attr("y",dimensions.boundedHeight-10)
        .text("Temperature -> ")
        .attr("fill","black")
        .attr("font-size","15px")
        .attr("text-anchor","middle");

    const xAxisGen = d3.axisBottom()
        .scale(xScaler);
    const xAxis = bounds.append("g")
        .call(xAxisGen)
        .style("transform",`translateY(${dimensions.boundedHeight}px)`);

    const yAxisGen = d3.axisLeft()
        .scale(yScaler);

    const yAxis = bounds.append("g")
        .call(yAxisGen)
        .style("transform",`translateX(${dimensions.boundedWidth}px)`);

    const meanLine1 = bounds.append("line")
        .attr("x2", dimensions.boundedWidth)
        .attr("y1", dimensions.boundedHeight/2)
        .attr("y2", dimensions.boundedHeight/2)
        .attr("stroke","black")
        .attr("stroke-dasharray","2px 4px");

    const barText = binGroups.filter(yAccessor)
        .append("text")
        .attr("x", d => xScaler(d.x0) + (xScaler(d.x1)-xScaler(d.x0))/2)
        .attr("y", d => yScaler(yAccessor(d)) - 5)
        .text(yAccessor)
        .attr("fill","black")
        .attr("font-size","16px")
        .attr("text-anchor","middle");

}

async function tempMax() {

    const data = await d3.json("./my_weather_data.json")
    const tempAccessor = (d) => d.temperatureMax;

    const yAccessor = d => d.length;

    var min = Math.min(...data.map(e => e.temperatureMax))
    console.log(min)

    var max = Math.max(...data.map(e => e.temperatureMax))
    console.log(max)

    const width = 600
    let dimensions = {
        width: width,
        height: width * 0.6,
        margin: {
            top: 20,
            right: 30,
            bottom: 20,
            left: 30,
        },
    }

    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom

    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("translate",`translate(${dimensions.margin.left}px,${dimensions.margin.top+-100}px)`);

    const xScaler = d3.scaleLinear()
        .domain([-50,100])
        .range([0,dimensions.boundedWidth])
        .nice()

    const binsGen = d3.bin()
        .domain(xScaler.domain())
        .value(tempAccessor)
        .thresholds(12);

    const bins = binsGen(data);
    console.log(bins);

    const yScaler = d3.scaleLinear()
        .domain([min, max])
        .range([dimensions.boundedHeight,0])

    const binGroup = bounds.append("g");

    const binGroups = binGroup.selectAll("g")
        .data(bins)
        .enter()
        .append("g");

    const barPadding = 1
    const barRect = binGroups.append("rect")
        .attr("x", d => xScaler(d.x0) + barPadding/20)
        .attr("y", d => yScaler(yAccessor(d)))
        .attr("width", d => d3.max([0, xScaler(d.x1) - xScaler(d.x0) - barPadding]))
        .attr("height", d => dimensions.boundedHeight - yScaler(yAccessor(d)))
        .attr("fill", "#AAAAEE");

    const mean = d3.mean(data,tempAccessor);
    console.log(mean);

    const meanLabe = bounds.append("text")
        .attr("x",dimensions.boundedWidth+15)
        .attr("y",dimensions.boundedHeight/2)
        .text("Mean")
        .attr("fill","maroon")
        .attr("font-size","12px")
        .attr("text-anchor","middle");

    const yLabel = bounds.append("text")
        .attr("x",dimensions.boundedWidth-30)
        .attr("y",50)
        .text("Count")
        .attr("fill","black")
        .attr("font-size","15px")
        .attr("text-anchor","middle");

    const xLabel = bounds.append("text")
        .attr("x",60)
        .attr("y",dimensions.boundedHeight-10)
        .text("Temperature")
        .attr("fill","black")
        .attr("font-size","15px")
        .attr("text-anchor","middle");

    const xAxisGen = d3.axisBottom()
        .scale(xScaler);
    const xAxis = bounds.append("g")
        .call(xAxisGen)
        .style("transform",`translateY(${dimensions.boundedHeight}px)`);

    const yAxisGen = d3.axisLeft()
        .scale(yScaler);

    const yAxis = bounds.append("g")
        .call(yAxisGen)
        .style("transform",`translateX(${dimensions.boundedWidth}px)`);

    const meanLine1 = bounds.append("line")
        .attr("x2", dimensions.boundedWidth)
        .attr("y1", dimensions.boundedHeight/2)
        .attr("y2", dimensions.boundedHeight/2)
        .attr("stroke","black")
        .attr("stroke-dasharray","2px 4px");

    const barText = binGroups.filter(yAccessor)
        .append("text")
        .attr("x", d => xScaler(d.x0) + (xScaler(d.x1)-xScaler(d.x0))/2)
        .attr("y", d => yScaler(yAccessor(d)) - 5)
        .text(yAccessor)
        .attr("fill","black")
        .attr("font-size","16px")
        .attr("text-anchor","middle");

}


async function tempLow() {


    const data = await d3.json("./my_weather_data.json")
    //Accessor
    const tempAccessor = d => d.temperatureLow;
    const yAccessor = d => d.length;

    const width = 600
    let dimensions = {
        width: width,
        height: width * 0.6,
        margin: {
            top: 20,
            right: 30,
            bottom: 20,
            left: 30,
        },
    }
    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom



    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("translate",`translate(${dimensions.margin.left}px,${dimensions.margin.top+-100}px)`);

    const xScaler = d3.scaleLinear()
        .domain([-50,100])
        .range([0,dimensions.boundedWidth])
        .nice()

    const binsGen = d3.bin()
        .domain(xScaler.domain())
        .value(tempAccessor)
        .thresholds(12);

    const bins = binsGen(data);
    console.log(bins);

    const yScaler = d3.scaleLinear()
        .domain([0,100])
        .range([dimensions.boundedHeight,0])

    const binGroup = bounds.append("g");

    const binGroups = binGroup.selectAll("g")
        .data(bins)
        .enter()
        .append("g");

    const barPadding = 1
    const barRect = binGroups.append("rect")
        .attr("x", d => xScaler(d.x0) + barPadding/20)
        .attr("y", d => yScaler(yAccessor(d)))
        .attr("width", d => d3.max([0, xScaler(d.x1) - xScaler(d.x0) - barPadding]))
        .attr("height", d => dimensions.boundedHeight - yScaler(yAccessor(d)))
        .attr("fill", "#AAAAEE");

    const mean = d3.mean(data,tempAccessor);
    console.log(mean);

    const meanLabe = bounds.append("text")
        .attr("x",dimensions.boundedWidth+15)
        .attr("y",dimensions.boundedHeight/2)
        .text("Mean")
        .attr("fill","maroon")
        .attr("font-size","12px")
        .attr("text-anchor","middle");

    const yLabel = bounds.append("text")
        .attr("x",dimensions.boundedWidth-30)
        .attr("y",50)
        .text("Count")
        .attr("fill","black")
        .attr("font-size","15px")
        .attr("text-anchor","middle");

    const xLabel = bounds.append("text")
        .attr("x",60)
        .attr("y",dimensions.boundedHeight-10)
        .text("Temperature")
        .attr("fill","black")
        .attr("font-size","16px")
        .attr("text-anchor","middle");

    const xAxisGen = d3.axisBottom()
        .scale(xScaler);
    const xAxis = bounds.append("g")
        .call(xAxisGen)
        .style("transform",`translateY(${dimensions.boundedHeight}px)`);

    const yAxisGen = d3.axisLeft()
        .scale(yScaler);

    const yAxis = bounds.append("g")
        .call(yAxisGen)
        .style("transform",`translateX(${dimensions.boundedWidth}px)`);

    const meanLine1 = bounds.append("line")
        .attr("x2", dimensions.boundedWidth)
        .attr("y1", dimensions.boundedHeight/2)
        .attr("y2", dimensions.boundedHeight/2)
        .attr("stroke","black")
        .attr("stroke-dasharray","2px 4px");

    const barText = binGroups.filter(yAccessor)
        .append("text")
        .attr("x", d => xScaler(d.x0) + (xScaler(d.x1)-xScaler(d.x0))/2)
        .attr("y", d => yScaler(yAccessor(d)) - 5)
        .text(yAccessor)
        .attr("fill","black")
        .attr("font-size","16px")
        .attr("text-anchor","middle");

}