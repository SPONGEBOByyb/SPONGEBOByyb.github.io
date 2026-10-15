// 给每个代码块的工具栏加一个"全屏"按钮（主题本身只有复制、折叠）
// 点一下铺满窗口，再点一下或按 Esc 退出；样式见 source/css/custom.css
(function () {
  function exitAll() {
    document.querySelectorAll('figure.highlight.hl-fullscreen').forEach(function (f) {
      f.classList.remove('hl-fullscreen');
      var label = f.querySelector('.hl-fullscreen-btn span');
      if (label) label.textContent = '全屏';
    });
    document.body.classList.remove('hl-fullscreen-open');
  }

  function addButtons() {
    document.querySelectorAll('#article-container figure.highlight .highlight-tools').forEach(function (tools) {
      if (tools.querySelector('.hl-fullscreen-btn')) return;
      var btn = document.createElement('div');
      btn.className = 'hl-fullscreen-btn';
      btn.title = '全屏查看代码';
      btn.innerHTML = '<i class="fas fa-expand"></i><span>全屏</span>';
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var fig = tools.closest('figure.highlight');
        if (fig.classList.contains('hl-fullscreen')) {
          exitAll();
        } else {
          exitAll();
          fig.classList.add('hl-fullscreen');
          // 如果代码块是折叠状态，全屏时自动展开
          tools.classList.remove('closed');
          document.body.classList.add('hl-fullscreen-open');
          btn.querySelector('span').textContent = '退出';
        }
      });
      // 不能放在最后：主题复制成功后会找工具栏最后一个元素的前一个元素来显示"复制成功"，
      // 所以插在复制提示前面；显示顺序由 CSS 的 order 控制
      tools.insertBefore(btn, tools.querySelector('.copy-notice'));
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') exitAll();
  });

  // 主题在 DOMContentLoaded 时生成工具栏，这里等它生成完再加按钮
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(addButtons, 0); });
  } else {
    setTimeout(addButtons, 0);
  }
})();
