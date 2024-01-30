const render = ($) => {
  $('#web-container').html('Hello, render with jQuery');
  return Promise.resolve();
};

let globalState = null;

!((global) => {
  global['web'] = {
    bootstrap: () => {
      console.log('web bootstrap');
      return Promise.resolve();
    },
    mount: (props) => {
      console.log('web mount');     
      globalState = props
      globalState.onGlobalStateChange((value, prev) => {        
        console.log("[onGlobalStateChange - master]:", value, prev);
      });

      // qiankun 触发 
      return render($);
    },
    unmount: () => {
      console.log('web unmount');
      return Promise.resolve();
    },
  };
})(window);

$('#web-button').on('click', function () {
  alert('测试点击')
  globalState && globalState.setGlobalState({
    ignore: "dev",
    user: {
      name: "dev",
    },
  });
})