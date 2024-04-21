def returnSum(list):
    total=0
    for i in list:
        total+=i
    return total
# print(returnSum([1,2,3,4,5,6]))

def returnAverage(list):
    total=0
    for i in list:
        total+=i
    length=len(list)
    return total/length
# print(returnAverage([0,1,2,3,4,5,4,100]))

def longestString(list):
    max_length=len(list[0])
    for i in list:
        if max_length<len(i):
            max_length=len(i)
    return max_length
# print(longestString(['hello','salom','assalomu','aleykum']))

def returnsquared(list):
    squared=[]
    for i in list:
        squaredN=i**2
        squared.append(squaredN)
    return squared
# print(returnsquared([1,2,3,4,5,6]))

def returnSecondLargest(list):
    sortedList=list.sort()
    return sortedList
print(returnSecondLargest([1,2,5,6,2,3,5,20,10]))