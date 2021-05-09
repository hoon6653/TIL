//0507 스택구현
class Stack {
    constructor() {
        this.storage = {};
        this.top = 0; // 스택의 가장 상단을 가리키는 포인터 변수를 초기화
    }

    size() {
        return this.top;
    }

    // 스택에 데이터를 추가
    push(element) {
        this.storage[this.top] = element;
        this.top += 1;
    }

    // 가장 나중에 추가된 데이터가 가장 먼저 추출
    pop() {
        // 빈 스택에 pop 연산을 적용해도 에러가 발생하지 않아야함
        if (this.size() === 0) {
            return;
        }

        const result = this.storage[this.top - 1];
        delete this.storage[this.top - 1];
        this.top -= 1;

        return result;
    }
}


//0508 큐 구현

class Queue {
    constructor() {
        this.storage = {};
        this.front = 0;
        this.rear = 0;
    }

    size() {
        return this.rear - this.front
    }

    // 큐에 데이터를 추가 할 수 있어야 함
    enqueue(element) {
        this.storage[this.rear] = element;
        this.rear += 1;
    }

    // 가장 먼저 추가된 데이터가 가장 먼저 추출되어야함
    dequeue() {
        // 빈 큐에 dequeue 연산을 적용해도 에러가 발생하지 않아야 함
        if (this.size() === 0) {
            return;
        }

        const result = this.storage[this.front];
        delete this.storage[this.front];
        this.front += 1;

        return result;
    }
}

//0509 브라우저 뒤로가기 앞으로가기
function browserStack(actions, start) {
    let prevStack = [];
    let nextStack = [];
    let current = start;

    for (let i = 0; i < actions.length; i++) {
        if (typeof actions[i] === 'string') {
            prevStack.push(current);
            current = actions[i];
            nextStack = [];
        } else if (actions[i] === -1) {
            if (prevStack.length !== 0) {
                nextStack.push(current);
                current = prevStack.pop()
            }
        } else if (actions[i] === 1) {
            if (nextStack.length !== 0) {
                prevStack.push(current);
                current = nextStack.pop()
            }
        }
    }
    return [prevStack, current, nextStack]
}