[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/vtMjwcap)
# hw2-handling-input-events
This is the starter code of [2023-Programming User Interface Homework](https://hackmd.io/@akairisu/HkUibgmx3)
* 姓名: 許容綮
* 網站連結: https://musical-shortbread-4a9982.netlify.app/
* 我的設計
![state machine](https://github.com/Computational-Physicality-Lab/hw2-handling-input-events-container513/blob/main/image.jpg)
![state pattern class diagram](https://user-images.githubusercontent.com/6697273/64253011-e94c4800-cf4e-11e9-8834-37236bb950e2.png)
  * 我使用了state pattern 這個 design pattern，流程大概就是 input.js 會 hold 一個 context object，而 context 裡面會 hold 目前的 state，如果 trigger 任何 event，都是由目前 hold 的 state 來接收處理。
  * 而接收 event 後，會將目前的 state 轉移到其他的 state。(根據上圖的 state machine )
  * 使用 state pattern 的好處就是可以將不同 state 要處理的邏輯分開，因為每個 state 對於同一個 event 都會有不同的行為。
  * 我在 context object 裡面放了一些變數 (如: currentTarget...)，是為了讓所有 state 都可以 access。(各個 state 都會 hold 我們在 input.js 生成的 context object )
  * 在手指雙擊觸控螢幕後，該 div 應進入「跟隨手指模式」。該模式僅會在觸發點擊事件（ click ）時被中止，即 touchstart 跟 touchend 在同一個位置快速發生。而我最後用來中止的觸發事件，不會造成 div 的位移。

* 加分項目: 我有實作垂直大小變化。
* 無有趣之處
