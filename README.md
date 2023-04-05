[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/vtMjwcap)
# hw2-handling-input-events
This is the starter code of [2023-Programming User Interface Homework](https://hackmd.io/@akairisu/HkUibgmx3)
* 姓名: 許容綮
* 網站連結: https://musical-shortbread-4a9982.netlify.app/
* 我的設計
![state machine](https://github.com/Computational-Physicality-Lab/hw2-handling-input-events-container513/blob/main/image.jpg)
我使用了state pattern這個design pattern，流程大概就是input.js會hold一個context object，而context裡面會hold目前的state，如果trigger任何event，都是由目前hold的state來處理。而在處理完event後，可能會將目前的state轉移到其他的state。
使用state pattern的好處就是可以將不同state要處理的邏輯分開，因為每個state對於同一個event都會有不同的行為。
* 加分項目: 我有實作垂直大小變化。
* 無有趣之處
