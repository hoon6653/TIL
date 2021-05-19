//0508 스택구현
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


//0509 큐 구현
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

//0510 브라우저 뒤로가기 앞으로가기
function browserStack(actions, start) {
    // actions : String과 Number 타입을 요소로 갖는 브라우저에서 행동한 순서를 차례대로 나열한 배열
    // start : String 타입의 시작 페이지를 나타내는 현재 접속해 있는 대문자 알파벳
    // let action = ["B", "C", -1, "D", "A", -1, 1, -1, -1]
    // start = "A"
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

// 0511 동화책 구현
function improveBook(books, speeds) {
    // books : Number 타입을 요소로 갖는 '퍼센트' 단위의 동화책 출간의 현재 진도가 나열된 배열
    // speeds : Number 타입을 요소로 갖는 '퍼센트' 단위의 동화책 출간 담당자의 '하루'에 작업할 수 있는 업무 속도가 나열된 배열
    // let books = [93, 30, 55] let speeds = [1, 30, 5]
    let answer = [];
    let workDay = [];
    let quotient = 0;
    let remainder = 0;

    // books 배열을 순회
    for (let i = 0; i < books.length; i++) {
        // 각 담당자마다 책이 발행되는 시간을 계산
        quotient = Math.floor((100 - books[i]) / speeds[i]);
        remainder = (100 - books[i]) % speeds[i];

        // 만약 remainder가 0보다 크면 quotient에 1을 더함
        if (remainder > 0) {
            quotient = quotient + 1;
        }

        // workDay 배열에 차례대로 담기
        // workDay 배열은 books배열에서 책이 발행되는 시간만을 추출해 넣은 배열
        workDay.push(quotient);
    }

    // workDay 배열이 0보다 클 때까지 반복
    while (workDay.length > 0) {

        // workDay에서 0번째 인덱스보다 큰 크기의 인덱스를 찾아 deployIndex에 할당
        let deployIndex = workDay.findIndex(fn => workDay[0] < fn);

        if (deployIndex === -1) {
            // 만약 찾지 못했다면 answer에 workDay 배열의 길이를 넣은 후, workDay 내부의 요소를 전부 삭제
            answer.push(workDay.length);
            workDay.splice(0, workDay.length);

        } else {
            // 만약 찾았다면, 해당 인덱스를 answer에 넣고, workDay에서 그만큼 제외
            answer.push(deployIndex);
            workDay.splice(0, deployIndex);
        }
    }
    return answer;
}

// 0512 프린터 구현
function queuePrinter(bufferSize, capacities, documents) {
    // bufferSize : Number 타입의 인쇄 작업 목록 크기
    // capacities : Number 타입의 인쇄 작업 목록에 추가될 수 있는 최대 용량
    // documents : Number 타입을 요소로 갖는 문서 크기가 나열된 배열
    /* 
        let bufferSize = 2
        let capacities = 10
        let documents = [7,4,5,6]
    */
    let buffer = [];
    let count = 0;

    for (let i = 0; i < bufferSize; i++) {
        buffer.push(i)
    }
    buffer.fill(0)

    for (let i = 0; i < documents.length; i++) {
        buffer.shift()
        if (buffer.reduce(function (a, b) {
            return a + b
        }, documents[i]) <= capacities) {
            buffer.push(documents[i])
        } else {
            i = i - 1
            buffer.push(0)
        }
        count = count + 1;
    }

    return count + bufferSize;
}

// 0514 트리 구현
class Tree {
    constructor(value) {
        // constructor로 만든 객체는 트리의 Node가 된다
        this.value = value;
        this.children = [];
    }

    // 트리의 삽입 메서드를 만들고
    insertNode(value) {
        const childNode = new Tree(value);
        this.children.push(childNode);
    }

    // 트리 안에 해당 값이 포함되어 있는지 확인하는 메서드를 만든다
    contains(value) {
        if (this.value === value) {
            return true;
        }
        for (let i = 0; i < this.children.length; i++) {
            const childNode = this.children[i]
            if (childNode.contains(value)) {
                return true;
            }
        }
        return false;
    }
}

// 0515 그래프 adjacency matrix 구현
class GraphWithAdjacencyMatrix {
    constructor() {
        this.matrix = [];
    }

    addVertex() {
        //버텍스 추가
        const currentLength = this.matrix.length;
        for (let i = 0; i < currentLength; i++) {
            this.matrix[i].push(0);
        }
        this.matrix.push(new Array(currentLength + 1).fill(0));
    }

    contains(vertex) {
        //버텍스가 있는지 확인
        if (this.matrix[vertex]) {
            return true;
        } else {
            return false;
        }
    }

    addEdge(from, to) {
        const currentLength = this.matrix.length;
        if (from === undefined || to === undefined) {
            console.log("2개의 인자 확인");
            return;
        }
        //간선을 추가할 수 없는 상황에서는 추가하지 말아야 함
        if (from + 1 > currentLength || to + 1 > currentLength || from < 0 || to < 0) {
            console.log("범위가 매트릭스 밖");
            return;
        }
        //간선을 추가
        this.matrix[from][to] = 1;
    }

    hasEdge(from, to) {
        //두 버텍스 사이에 간선이 있는지 확인
        if (this.matrix[from][to] === 1) {
            return true
        } else {
            return false
        }
    }

    removeEdge(from, to) {
        const currentLength = this.matrix.length;
        if (from === undefined || to === undefined) {
            console.log("2개의 인자 확인");
            return;
        }
        //간선을 지울 수 없는 상황에서는 지우지 말아야 함
        if (from + 1 > currentLength || to + 1 > currentLength || from < 0 || to < 0) {
            return;
        }
        //간선 지우기
        this.matrix[from][to] = 0
    }
}

// 0518 그래프 인접 행렬 생성하기
function createMatrix(edges) {
    // 인자 edges : Number 타입의 방향/무향인 간선들의 목록이 담긴 배열
    // ex) [[0, 3, "directed"],[0, 2, "directed"],[1, 3, "directed"],[2, 1, "directed"]]
    let matrixLength = edges.flat().filter(e => typeof e === 'number').reduce((a, b) => Math.max(a, b))
    let matrix = new Array(matrixLength + 1).fill(0).map(() => new Array(matrixLength + 1).fill(0))

    for (let i = 0; i < edges.length; i++) {
        if (edges[i][2] === 'directed') {
            matrix[edges[i][0]][edges[i][1]] = 1
        } else if (edges[i][2] === 'undirected') {
            matrix[edges[i][0]][edges[i][1]] = 1
            matrix[edges[i][1]][edges[i][0]] = 1
        }
    }
    return matrix;
}

// 0519 인접 행렬 길찾기
function getDirections(matrix, from, to) {
    // matrix : Array 타입을 요소로 갖는 인접 행렬이 담긴 2차원 배열
    // from : Number 타입의 시작 정점
    // to : Number 타입의 도착 정점
    /* ex)
        const result = getDirections(
            [
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1],
                [0, 1, 0, 0]
            ],
            0,
            2
        )
    */
    function bfs(graph, root) {
        let nodesLen = {};

        for (let i = 0; i < graph.length; i++) {
            nodesLen[i] = Infinity;
        }
        nodesLen[root] = 0;

        let queue = [root];
        let current;

        while (queue.length !== 0) {
            current = queue.shift();

            let curConnected = graph[current];
            let neighborIdx = [];
            let idx = curConnected.indexOf(1);
            while (idx !== -1) {
                neighborIdx.push(idx);
                idx = curConnected.indexOf(1, idx + 1);
            }

            for (let j = 0; j < neighborIdx.length; j++) {
                if (nodesLen[neighborIdx[j]] === Infinity) {
                    nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
                    queue.push(neighborIdx[j]);
                }
            }
        }
        return nodesLen;
    };
    let graph = matrix
    let obj = bfs(graph, from)
    if (obj[to] === Infinity) {
        return false;
    } else {
        return true
    }
}