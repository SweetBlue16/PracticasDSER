import sys
sys.path.append('./calc')

from concurrent import futures
import time

import grpc
import calculadora_pb2 as pb2
import calculadora_pb2_grpc as pb2_grpc

class CalculadoraServicer(pb2_grpc.CalculadoraServiceServicer):
    def suma(self, request, context):
        result = request.n1 + request.n2
        return pb2.OperacionResponse(result=result)

    def resta(self, request, context):
        result = request.n1 - request.n2
        return pb2.OperacionResponse(result=result)

    def mult(self, request, context):
        result = request.n1 * request.n2
        return pb2.OperacionResponse(result=result)

    def div(self, request, context):
        if request.n2 == 0:
            context.set_details('Division by zero is not allowed')
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            return pb2.OperacionResponse()
        result = request.n1 / request.n2
        return pb2.OperacionResponse(result=result)
    
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_CalculadoraServiceServicer_to_server(CalculadoraServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started on port 50051...")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()