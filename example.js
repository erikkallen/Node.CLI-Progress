var _progress = require('./main');

// run the example sequentially! otherwise both will write to stdout/stderr simultaneous !
Example1(function(){
    Example2(function(){
        Example3(function(){
            console.log('\nDemo finished!');
        });
    });
});

function Example1(onComplete){
    // EXAMPLE 1 ---------------------------------------------
    console.log('\nExample 1 - Standard configuration (4s)');
    // create new progress bar using default values
    var b1 = new _progress.Bar();
    b1.start(200, 0);

    // the bar value - will be linear incremented
    var value = 0;

    // 20ms update rate
    var timer = setInterval(function(){
        // increment value
        value++;

        // update the bar value
        b1.update(value)

        // set limit
        if (value >= b1.getTotal()){
            // stop timer
            clearInterval(timer);

            b1.stop();

            // run complete callback
            onComplete.apply(this);
        }
    }, 20);
}


function Example2(onComplete){
    // EXAMPLE 2 ---------------------------------------------
    console.log('\nExample 2 - Custom configuration');

    // create new progress bar using default values
    var b2 = new _progress.Bar({
        barCompleteChar: '#',
        barIncompleteChar: '_',
        format: ' |- Current Upload Progress: {percentage}%' + ' - ' + '||{bar}||',
        fps: 5,
        stream: process.stdout,
        barsize: 30
    });
    b2.start(100, 0);

    // 50ms update rate
    var timer = setInterval(function(){
        // increment value
        b2.increment();

        // set limit
        if (b2.value >= b2.getTotal()){
            // stop timer
            clearInterval(timer);

            b2.stop();

            // run complete callback
            onComplete.apply(this);
        }
    }, 50);
}

function Example3(onComplete){
    // EXAMPLE 3 ---------------------------------------------
    console.log('\nExample 3 - Stop the Bar Automatically');
    // create new progress bar using default values
    var b3 = new _progress.Bar({
        stopOnComplete: true,
        clearOnComplete: true
    });
    b3.start(200, 0);

    // the bar value - will be linear incremented
    var value = 0;

    // 20ms update rate
    var timer = setInterval(function(){
        // increment value
        value++;

        // update the bar value
        b3.update(value);

        // set limit
        if (value >= b3.getTotal()){
            // stop timer
            clearInterval(timer);

            // run complete callback
            onComplete.apply(this);
        }
    }, 20);
}