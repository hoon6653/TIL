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

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 0524 토이문제 1 orderOfPresentation
function orderOfPresentation(N, K) {
    // 조의 개수 N, 발표 순서 K

    // N은 최대 12입니다.
    // 발표 순서를 만드는 것은 순열(permutation)이므로, 발표 순서의 최대 크기는 12!입니다.
    // 이는 약 4억 8천만에 해당하며, 일반적인 수행 속도 상한(약 1억)을 훨씬 상회하므로 순열을 전부 생성하는 것은 올바른 접근 방법이 아닙니다.

    const factorial = (n) => {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    };

    // 발표 순서를 담는 변수 생성
    let order = 0;

    // N개의 조 중에, 어떠한 조가 이미 포함되었는지 확인하기 위해 배열을 생성합니다.
    // 만약 N이 3이라면 [false, false, false, false]로 생성됩니다.
    // 제일 첫 번째는 더미 데이터입니다. (인덱스는 0부터 시작하지만 조는 1부터 시작하기 때문에)
    const isUsed = Array(N + 1).fill(false);

    // K의 길이만큼 순회합니다.
    for (let i = 0; i < K.length; i++) {
        // K의 i번째 조를 변수에 담습니다.
        const num = K[i];
        // 사용했는지 판별하기 위해 isUsed에 체크합니다. (중복이 아니기 때문에)
        isUsed[num] = true;
        // num보다 앞에 올 수 있는 수들의 배열을 복제해서,
        const candidates = isUsed.slice(1, num);
        // 이 중에서 아직 사용되지 않은 수의 개수를 구합니다.
        const validCnt = candidates.filter((el) => el === false).length;
        // 아직 사용되지 않은 수, 그 전까지의 모든 경우의 수를 카운트합니다.
        const formerCnt = validCnt * factorial(N - i - 1);
        // order에 추가합니다.
        order = order + formerCnt;

        /**
         * 설명을 덧붙이자면,
         * 만약 K가 [2, 3, 1]이라고 가정했을 때, 첫 번째 num은 2가 될 것입니다.
         * 2가 제일 앞에 있다고 가정한다면, 앞자리가 2의 차례가 오기 전에 1의 모든 경우의 수를 구했을 것이고,
         * 1의 모든 경우의 수를 지금부터 구하게 됩니다.
         * 
         * 그렇다면, IsUsed 배열은 이렇게 됩니다. [false(더미), false, true, false]
         * candidates 배열은 이렇게 됩니다. => [false]
         * validCnt는 이렇게 됩니다. => 1
         * formerCnt는 이렇게 됩니다. => 1 * factorial(3 - 0 - 1) // i는 0부터 시작하기 때문에 N에서 남아 있는 수를 구할 때 - 1이 추가로 필요합니다.
         * order는 2를 추가합니다.
         * 
         * 두 번째를 순회했을 땐, num이 3이 됩니다.
         * 그렇다면, IsUsed 배열은 이렇게 됩니다. [false(더미), false, true, true]
         * candidates 배열은 이렇게 됩니다. => [false]
         * validCnt는 이렇게 됩니다 => 1
         * formerCnt는 이렇게 됩니다 => 1 * factorial(3 - 1 - 1)
         * order는 1을 추가합니다. (3)
         * 
         * 세 번째를 순회했을 땐, num이 1이 됩니다.
         * IsUsed 배열은 이렇게 됩니다. [false, true, true, true]
         * candidates 배열은 []이고, validCnt는 0이 되어, formerCnt는 0이 됩니다.
         * 
         * 발표 순서는 0부터 시작하기 때문에 0, 1, 2, 3으로
         * 결과적으로, 값은 3이 됩니다.
         */
    }

    return order;
}

// 0525 토이문제 2 fibonacci

// naive solution: O(2^N)
// let fibonacci = function (n) {
//   if (n <= 1) return n;
//   return fibonacci(n - 1) + fibonacci(n - 2);
// };

// dynamic with meoization: O(N)
// 이미 해결한 문제의 정답을 따로 기록해두고,
// 다시 해결하지 않는 기법
// fibo(10)
// = fibo(9) + fibo(8)
// = fibo(8) + fibo(7) + fibo(7) + fibo(6)
// 여기까지만 보아도 동일한 문제가 중복으로 계산되는 것을 알 수 있다.
let fibonacci = function (n) {
    const memo = [0, 1];
    const aux = (n) => {
        // 이미 해결한 적이 있으면, 메모해둔 정답을 리턴한다.
        if (memo[n] !== undefined) return memo[n];
        // 새롭게 풀어야하는 경우, 문제를 풀고 메모해둔다.
        memo[n] = aux(n - 1) + aux(n - 2);
        return memo[n];
    };
    return aux(n);
};


// 0526 토이문제 3 isSubsetOf
const isSubsetOf = function (base, sample) {
    // naive solution: O(M * N)
    // return sample.every((item) => base.includes(item));

    // 각 배열을 정렬: O(N * logN), O(M * logM)
    // N >= M 이므로, O(N * logN)
    base.sort((a, b) => a - b);
    sample.sort((a, b) => a - b);

    const findItemInSortedArr = (item, arr, from) => {
        for (let i = from; i < arr.length; i++) {
            if (item === arr[i]) return i;
            else if (item < arr[i]) return -1;
        }
        return -1;
    };

    let baseIdx = 0;
    for (let i = 0; i < sample.length; i++) {
        baseIdx = findItemInSortedArr(sample[i], base, baseIdx);
        if (baseIdx === -1) return false;
    }
    return true;
};


// 0726 토이문제 4 bubbleSort
const swap = function (idx1, idx2, arr) {
    // 두 변수를 바꾸는 방법

    // 1) 임시 변수를 활용한 방법
    // let temp = arr[idx1];
    // arr[idx1] = arr[idx2];
    // arr[idx2] = temp;

    // 2) Destructuring assignment를 활용한 방법
    // arr이 reference type이라 가능
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];

    // 3) XOR 연산을 활용한 방법
    // arr이 reference type이라 가능
    // arr[idx1] ^= arr[idx2];
    // arr[idx2] ^= arr[idx1];
    // arr[idx1] ^= arr[idx2];
};

// naive solution
// let bubbleSort = function (arr) {
//   let N = arr.length;

//   for (let i = 0; i < N - 1; i++) {
//     // 매 반복(iteration)마다 i번째로 큰 수가 마지막에서 i번째 위치하게 된다.
//     // 이미 정렬된 요소는 고려할 필요가 없으므로, 'j < N - 1 - i'만 비교하면 된다.
//     for (let j = 0; j < N - 1 - i; j++) {
//       if (arr[j] > arr[j + 1]) {
//         swap(j, j + 1, arr);
//       }
//     }
//   }

//   return arr;
// };

// optimized solution
let bubbleSort = function (arr) {
    let N = arr.length;

    for (let i = 0; i < N; i++) {
        // swap 횟수를 기록한다.
        // 어떤 요소도 swap되지 않은 경우, 배열은 정렬된 상태이다.
        let swaps = 0;

        // 매 반복(iteration)마다 i번째로 큰 수가 마지막에서 i번째 위치하게 된다.
        // 이미 정렬된 요소는 고려할 필요가 없으므로, 'j < N - 1 - i'만 비교하면 된다.
        for (let j = 0; j < N - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swaps++;
                swap(j, j + 1, arr);
            }
        }

        if (swaps === 0) {
            break;
        }
    }

    return arr;
};


// 0814 토이문제 5 tiling
// naive solution: O(2^N)
// 2 x 4 보드에 타일을 놓는 방법은 5가지다.
// 각 타일을 a, b, c, d로 구분한다.
// 아직 타일이 놓이지 않는 부분은 -로 표기한다.
// 타일을 놓는 방법은 가장 왼쪽부터 세로로 놓거나 가로로 놓는 것으로 시작한다.
// 1) 세로로 놓는 법
//   2 | a - - -
//   1 | a - - -
//   ------------
// 2) 가로로 놓는 법
// 타일을 가로로 놓게 되면, 그 바로 아래에는 가로로 놓을 수 밖에 없다.
//   2 | a a - -
//   1 | b b - -
//   ------------
// 이때, 타일이 아직 놓이지 않은 부분은 사실 크기만 다를뿐 같은 종류의 문제라는 것을 알 수 있다.
// 즉, 2 x 4 보드에 타일을 놓는 방법은 아래 두 가지 방법을 더한 결과와 같다.
//  1) 2 x 3 보드에 타일을 놓는 방법
//  2) 2 x 2 보드에 타일을 놓는 방법
// 따라서 2 x n 타일 문제는 아래와 같이 재귀적으로 정의할 수 있다.
// 주의: 재귀적 정의에는 항상 기초(base), 즉 더 이상 재귀적으로 정의할 수 없는(쪼갤 수 없는) 문제를 별도로 정의해야 한다.
// let tiling = function (n) {
//   if (n <= 2) return n;
//   return tiling(n - 1) + tiling(n - 2);
// };

// dynamic with memoization: O(N)
let tiling = function (n) {
    // 인덱스를 직관적으로 관리하기 위해
    // 앞 부분을 의미없는 데이터(dummy)로 채운다.
    const memo = [0, 1, 2];

    // 재귀를 위한 보조 함수(auxiliary function)을 선언)
    const aux = (size) => {
        // 이미 해결한 문제는 풀지 않는다.
        if (memo[size] !== undefined) return memo[size];
        if (size <= 2) return memo[n];
        memo[size] = aux(size - 1) + aux(size - 2);
        return memo[size];
    };
    return aux(n);
};

  // dynamic with tabulation: O(N)
  // tabulation은 데이터를 테이블에 정리하면서 bottom-up 방식으로 해결하는 기법을 말합니다.
  // let tiling = function (n) {
  //   const memo = [0, 1, 2];
  //   if (n <= 2) return memo[n];
  //   for (let size = 3; size <= n; size++) {
  //     memo[size] = memo[size - 1] + memo[size - 2];
  //   }
  //   return memo[n];
  // };

  // dynamic with slicing window: O(N)
  // slicing window은 필요한 최소한의 데이터만을 활용하는 것을 말합니다.
  // 크기 n의 문제에 대한 해결을 위해 필요한 데이터는 오직 2개뿐이라는 사실을 이용합니다.
  // let tiling = function (n) {
  //   let fst = 1,
  //     snd = 2;
  //   if (n <= 2) return n;
  //   for (let size = 3; size <= n; size++) {
  //     // 앞의 두 수를 더해 다음 수를 구할 수 있다.
  //     const next = fst + snd;
  //     // 다음 문제로 넘어가기 위해 필요한 2개의 데이터의 순서를 정리한다.
  //     fst = snd;
  //     snd = next;
  //   }
  //   return snd;
  // };


// 