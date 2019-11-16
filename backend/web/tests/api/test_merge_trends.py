from trends.handlers.trends import merge
import pytest


@pytest.mark.parametrize(
    ('src1', 'src2', 'factor1', 'factor2', 'limit', 'expected_result'), [
        ([], [], 1, 2, 0, []),
        ([], [], 1, 2, 1, []),
        ([1], [22, 222, 2222], 1, 5, 2, [1, 22]),
        ([1, 11], [22, 222, 22222], 1, 5, 2, [1, 11]),
        ([1, 11], [22, 222, 22222], 1, 5, 3, [1, 11, 22]),
        ([], [22, 222, 22222], 1, 5, 3, [22, 222, 22222]),
        ([1, 11], [], 1, 5, 3, [1, 11]),
        ([1, 11], [], 2, 5, 3, [1, 11]),
        ([1, 11, 111], [22], 1, 2, 3, [1, 11, 22]),
    ]
)
def test_merge_trends(src1, src2, factor1, factor2, limit, expected_result):
    r = merge(src1, src2, factor1, factor2, limit)
    print("result: ", sorted(r))
    assert r == expected_result
