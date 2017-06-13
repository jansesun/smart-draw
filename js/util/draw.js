export const seedSort = function(n) {
    n = n && (1 << Math.ceil(Math.log2(n)));
    let result = [];
    function _seedSort(n) {
        var len = result.length;
        if(len === n) {
            return;
        }
        if(len === 0) {
            result.push(1);
        } else {
            if(!((len - 1) & len)) {
                for(var i = len - 1; i >= 0 && n !== result.length; --i) {
                    result.push(result[i] + (i % 2 ? -1 : 1) * (n / len - 1));
                }
            }
        }
        _seedSort(n);
    }
    _seedSort(n);
    return result;
};
export const generateBrackets = function(list, defaultPlayer) {
    const drawIndex = seedSort(list.length);
    const drawResult = [];
    drawIndex.forEach((v, i) => {
        const index = i >> 1;
        drawResult[index] = [...(drawResult[index] || []), list[v - 1] || (typeof defaultPlayer === 'object' ? { ...defaultPlayer } : defaultPlayer)];
    });
    return drawResult;
};
/**
 * list = [
 *   {
 *     name: 'SunJian',
 *     seedIndex: 1,
 *     gender: 1 // 1 为男生 0为女生
 *   }
 * ];
 */

/**
 * draw
 * @param  {Array} list player list
 * @return {Array} brackets
 */
export default function draw(list) {
    // 种子选手按顺序排位
    const seededPlayers = list.filter(player => player.seedIndex !== void 0);
    seededPlayers.sort((player1, player2) => player1.seedIndex - player2.seedIndex);

    // 非种子女选手随机排位
    const unseededGirls = list.filter(player => player.gender === 0 && player.seedIndex === void 0);
    unseededGirls.sort(() => Math.random() - 0.5);

    // 其他选手随机排位
    const otherPlayers = list.filter(player => player.gender === 1 && player.seedIndex === void 0);
    otherPlayers.sort(() => Math.random() - 0.5);

    const sortedPlayers = [...seededPlayers, ...unseededGirls, ...otherPlayers];

    return generateBrackets(sortedPlayers, {
        name: 'N/A',
        gender: 1
    });
}
// var alist = [
//     {
//         name: '龚航',
//         seedIndex: 1,
//         gender: 1
//     },
//     {
//         name: '马冉',
//         gender: 1
//     },
//     {
//         name: '程紫光',
//         gender: 1
//     },
//     {
//         name: '徐凡',
//         gender: 1
//     },
//     {
//         name: '周清华',
//         gender: 1
//     },
//     {
//         name: '王向阳',
//         gender: 1
//     },
//     {
//         name: '曾超宇',
//         gender: 1
//     },
//     {
//         name: '何志鹏',
//         gender: 1
//     },
//     {
//         name: '杨凯',
//         gender: 1
//     },
//     {
//         name: '郭柄男',
//         gender: 0
//     },
//     {
//         name: '王迪',
//         gender: 1
//     },
//     {
//         name: '渠慧帆',
//         gender: 1
//     },
//     {
//         name: '杨帆',
//         gender: 1
//     },
//     {
//         name: '李林涛',
//         gender: 1
//     },
//     {
//         name: '付瑶',
//         gender: 0
//     },
//     {
//         name: '胡盛昌',
//         gender: 1
//     },
//     {
//         name: '高鹏',
//         gender: 1
//     },
//     {
//         name: '赵强',
//         gender: 1
//     },
//     {
//         name: '葛江华',
//         gender: 1
//     },
//     {
//         name: '余俊杰',
//         gender: 1
//     },
//     {
//         name: '吕兢',
//         gender: 1
//     },
//     {
//         name: '常龙',
//         gender: 1
//     },
//     {
//         name: '孙健',
//         gender: 1
//     },
//     {
//         name: '彭曲',
//         gender: 1
//     },
//     {
//         name: '汪鹭',
//         gender: 0
//     }
// ];
// draw(alist);